'use client';
import React from 'react';
import Indicator from './Indicator';
import Column from './Column';
import Task from './Task';
import useBoundingClientRect from './use-bounding-client-rect.hook';
import { POSITION, GAP, INDICATOR_HEIGHT } from './constants';
import type { Record, SwapRequest, ChildId } from '@/types';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import styles from './Board.module.css';

async function swapRecord(
	endpoint: string,
	{
		arg,
	}: {
		arg: SwapRequest;
	},
) {
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(arg),
	});
	const json = await response.json();
	return json;
}

async function getRecord(endpoint: string) {
	const response = await fetch(endpoint);
	const json = await response.json();
	return json;
}

function optimisticUpdate(inputData: Record[], swapData: SwapRequest) {
	const nextData: Record[] = JSON.parse(JSON.stringify(inputData));

	const { taskId, oldColumnId, newColumnId, targetPosition } = swapData;

	const oldColumn = nextData.find(r => r.id === oldColumnId) as Record;
	const oldColumnChild = oldColumn.childId.find(
		r => r.id === taskId,
	) as ChildId;
	const originalPosition = oldColumnChild.order;

	if (oldColumnId === newColumnId && originalPosition === targetPosition) {
		return nextData;
	}

	if (oldColumnId !== newColumnId) {
		const task = nextData.find(r => r.id === taskId) as Record;
		task.parentId = newColumnId;

		const newColumn = nextData.find(r => r.id === newColumnId) as Record;
		for (let i = 0; i < newColumn.childId.length; i++) {
			if (newColumn.childId[i]['order'] >= targetPosition) {
				newColumn.childId[i]['order'] += 1;
			}
		}
		newColumn.childId.push({
			id: taskId,
			order: targetPosition,
			recordId: newColumnId,
		});

		oldColumn.childId = oldColumn.childId.filter(c => c.id !== taskId);
		for (let i = 0; i < oldColumn.childId.length; i++) {
			if (oldColumn.childId[i]['order'] > originalPosition) {
				oldColumn.childId[i]['order'] -= 1;
			}
		}
	} else if (oldColumnId === newColumnId) {
		if (originalPosition < targetPosition) {
			for (let i = 0; i < oldColumn.childId.length; i++) {
				if (
					oldColumn.childId[i]['order'] > originalPosition &&
					oldColumn.childId[i]['order'] < targetPosition
				) {
					oldColumn.childId[i]['order'] -= 1;
				}
			}
			oldColumnChild.order = targetPosition - 1;
		} else if (originalPosition > targetPosition) {
			for (let i = 0; i < oldColumn.childId.length; i++) {
				if (
					oldColumn.childId[i]['order'] >= targetPosition &&
					oldColumn.childId[i]['order'] < originalPosition
				) {
					oldColumn.childId[i]['order'] += 1;
				}
			}
			oldColumnChild.order = targetPosition;
		}
	}

	return nextData;
}

function Board({
	boardName,
	serverData,
}: {
	boardName: string;
	serverData: Record[];
}) {
	const { data: clientData }: { data: Record[] } = useSWR('/api', getRecord);
	const { trigger } = useSWRMutation('/api', swapRecord);

	const [startPosition, setStartPosition] = React.useState(POSITION);
	const [currentPosition, setCurrentPosition] = React.useState(POSITION);
	const [columnRef, columnBoundaries] = useBoundingClientRect(clientData);
	const [taskRef, taskBoundaries] = useBoundingClientRect(clientData);
	const draggedTask = getDraggedTask(startPosition);
	const targetTask = getTargetTask(currentPosition);
	const indicatorPosition = getIndicatorPosition();
	const columnWidth =
		columnBoundaries.length !== 0 ? columnBoundaries[0].width : 0;
	const isDragging = !(draggedTask === null);

	function getDraggedTask({ x, y }: typeof POSITION) {
		for (let i = 0; i < taskBoundaries.length; i++) {
			const { top, bottom, left, right, columnId, taskId, height } =
				taskBoundaries[i];
			if (x >= left && x <= right && y >= top && y <= bottom) {
				const filteredTaskBoundaries = taskBoundaries.filter(
					t => t.columnId === columnId,
				);
				const taskIndex = filteredTaskBoundaries.findIndex(
					t => t.taskId === taskId,
				);
				return { columnId, taskId, height, position: taskIndex };
			}
		}
		return null;
	}

	function getTargetTask({ x, y }: typeof POSITION) {
		let isOut = true;
		let targetColumnId = -1;
		for (let i = 0; i < columnBoundaries.length; i++) {
			const { top, bottom, left, right, columnId } = columnBoundaries[i];
			if (x >= left && x <= right && y >= top && y <= bottom) {
				isOut = false;
				targetColumnId = columnId;
				break;
			}
		}
		if (isOut) {
			return null;
		}
		const filteredTaskBoundaries = taskBoundaries.filter(
			t => t.columnId === targetColumnId,
		);
		if (filteredTaskBoundaries.length === 0) {
			return { columnId: targetColumnId, position: 0 };
		}
		const taskMiddleLines = filteredTaskBoundaries.map(
			({ top, bottom }) => (top + bottom) / 2,
		);
		for (let i = 0; i < taskMiddleLines.length; i++) {
			if (y < taskMiddleLines[i]) {
				return { columnId: targetColumnId, position: i };
			}
		}
		return { columnId: targetColumnId, position: taskMiddleLines.length };
	}

	function getIndicatorPosition() {
		if (targetTask === null || draggedTask === null) {
			return null;
		}
		if (
			targetTask.columnId === draggedTask.columnId &&
			(targetTask.position === draggedTask.position ||
				targetTask.position === draggedTask.position + 1)
		) {
			return null;
		}
		const filteredTaskBoundaries = taskBoundaries.filter(
			t => t.columnId === targetTask.columnId,
		);
		if (filteredTaskBoundaries.length === 0) {
			const originalTaskBoundaries = taskBoundaries.filter(
				t => t.columnId === draggedTask.columnId,
			);
			if (originalTaskBoundaries.length === 0) {
				return null;
			}
			const column = columnBoundaries.find(
				cb => cb.columnId === targetTask.columnId,
			);
			if (column === undefined) {
				return null;
			}
			return {
				top: originalTaskBoundaries[0].top + INDICATOR_HEIGHT / 2,
				left: column.left,
			};
		}
		if (targetTask.position === filteredTaskBoundaries.length) {
			const lastIndex = filteredTaskBoundaries.length - 1;
			return {
				top: filteredTaskBoundaries[lastIndex].bottom + GAP / 2,
				left: filteredTaskBoundaries[lastIndex].left,
			};
		}
		return {
			top: filteredTaskBoundaries[targetTask.position].top - GAP / 2,
			left: filteredTaskBoundaries[targetTask.position].left,
		};
	}

	function handlePointerUp() {
		setStartPosition(POSITION);
		setCurrentPosition(POSITION);
		if (
			draggedTask === null ||
			targetTask === null ||
			draggedTask.taskId === undefined
		) {
			return;
		}
		const swapData = {
			taskId: draggedTask.taskId,
			oldColumnId: draggedTask.columnId,
			newColumnId: targetTask.columnId,
			targetPosition: targetTask.position,
		};

		trigger(swapData, {
			optimisticData: currentData => optimisticUpdate(currentData, swapData),
			rollbackOnError: true,
		});
	}

	function isTaskSelected({ x, y }: typeof POSITION) {
		for (let i = 0; i < taskBoundaries.length; i++) {
			const { top, bottom, left, right } = taskBoundaries[i];
			if (x >= left && x <= right && y >= top && y <= bottom) {
				return true;
			}
		}
		return false;
	}

	function handlePointerDown({ clientX, clientY }: React.PointerEvent) {
		if (!isTaskSelected({ x: clientX, y: clientY })) {
			return;
		}
		setStartPosition({ x: clientX, y: clientY });
		setCurrentPosition({ x: clientX, y: clientY });
	}

	React.useEffect(() => {
		if (!isDragging) {
			return;
		}
		function handlePointermove({ clientX, clientY }: PointerEvent) {
			setCurrentPosition({ x: clientX, y: clientY });
		}
		window.addEventListener('pointermove', handlePointermove);
		return () => {
			window.removeEventListener('pointermove', handlePointermove);
		};
	}, [isDragging]);

	let usedData: Record[];

	if (clientData) {
		usedData = clientData;
	} else {
		usedData = serverData;
	}

	const board = usedData.find(record => record.name === boardName);
	if (!board) {
		return <p style={{ color: 'white' }}>No data</p>;
	}
	const columns = board.childId
		.map(({ id }) => usedData.find(r => r.id === id))
		.filter(element => element !== undefined) as Record[];

	return (
		<div className={styles.wrapper}>
			{indicatorPosition !== null && (
				<Indicator
					top={indicatorPosition.top}
					left={indicatorPosition.left}
					width={columnWidth}
				/>
			)}
			{columns.map(({ name, id: columnId, childId }) => {
				const tasks = childId
					.toSorted((a, b) => a.order - b.order)
					.map(({ id }) => usedData.find(r => r.id === id))
					.filter(element => element !== undefined) as Record[];
				return (
					<Column key={columnId} ref={columnRef} columnId={columnId}>
						<div className={styles.columnTitleWrapper}>
							<span className={styles.light} />
							<span className={styles.columnTitle}>
								{name} {`(${childId.length})`}
							</span>
						</div>
						{tasks.map(({ title, id: taskId }) => {
							const task = usedData.find(r => r.id === taskId);
							const totalSubtask = task === undefined ? 0 : task.childId.length;
							const completedSubtask =
								task === undefined
									? 0
									: task.childId.filter(
											({ id: subtaskId }) =>
												usedData.find(r => r.id === subtaskId)?.isCompleted ===
												true,
									  ).length;
							const isTaskDragged =
								draggedTask !== null && draggedTask.taskId === taskId;
							return (
								<div key={taskId} className={styles.taskWrapper}>
									<Task
										ref={taskRef}
										columnId={columnId}
										taskId={taskId}
										style={{
											'--cursor': 'pointer',
											'--background': isTaskDragged ? '#20212c' : undefined,
										}}
										handlePointerDown={handlePointerDown}
									>
										<span
											style={{
												'--color': isTaskDragged ? '#3e3f4e' : undefined,
											}}
											className={styles.taskTitle}
										>
											{title}
										</span>
										<span
											style={{
												'--color': isTaskDragged ? '#3e3f4e' : undefined,
											}}
											className={styles.subTitle}
										>
											{completedSubtask} of {totalSubtask} substacks
										</span>
									</Task>
									{isTaskDragged && (
										<Task
											columnId={columnId}
											taskId={taskId}
											style={{
												'--cursor':
													draggedTask !== null && targetTask === null
														? 'not-allowed'
														: 'pointer',
												'--x': `${currentPosition.x - startPosition.x}px`,
												'--y': `${currentPosition.y - startPosition.y}px`,
												position: 'absolute',
												inset: '0',
												zIndex: '2',
												'--background': '#828fa3',
											}}
											handlePointerUp={handlePointerUp}
										>
											<span className={styles.taskTitle}>{title}</span>
										</Task>
									)}
								</div>
							);
						})}
					</Column>
				);
			})}
		</div>
	);
}

export default Board;
