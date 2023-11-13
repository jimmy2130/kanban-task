'use client';
import * as React from 'react';
import styled from 'styled-components';
import Indicator from './Indicator';
import Column from './Column';
import Task from './Task';
import useBoundingClientRect from './use-bounding-client-rect.hook';
import { POSITION, GAP, INDICATOR_HEIGHT } from './constants';
import type { Record, SwapRequest, ChildId } from '@/constants';
import useSWRMutation from 'swr/mutation';

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
		newColumn.childId.sort((a, b) => a.order - b.order);

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
		oldColumn.childId.sort((a, b) => a.order - b.order);
	}
	return nextData;
}

function Board({
	revalidate,
	boardName,
	serverData,
}: {
	revalidate: (path: string) => void;
	boardName: string;
	serverData: Record[];
}) {
	const { trigger } = useSWRMutation('/api', swapRecord);
	const [optimisticData, setOptimisticData] = React.useState(serverData);

	const [startPosition, setStartPosition] = React.useState(POSITION);
	const [currentPosition, setCurrentPosition] = React.useState(POSITION);
	const [columnRef, columnBoundaries] = useBoundingClientRect(serverData);
	const [taskRef, taskBoundaries] = useBoundingClientRect(serverData);
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
		setOptimisticData(currentData => optimisticUpdate(currentData, swapData));
		trigger(swapData);
		revalidate('/');
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

	const board = optimisticData.find(record => record.name === boardName);
	if (!board) {
		return <p style={{ color: 'white' }}>No data</p>;
	}
	const columns = board.childId
		.map(({ id }) => optimisticData.find(r => r.id === id))
		.filter(element => element !== undefined) as Record[];

	return (
		<Wrapper>
			{indicatorPosition !== null && (
				<Indicator
					style={{
						'--top': `${indicatorPosition.top}px`,
						'--left': `${indicatorPosition.left}px`,
						'--width': `${columnWidth}px`,
					}}
				/>
			)}
			{columns.map(({ name, id: columnId, childId }) => {
				const tasks = childId
					.map(({ id }) => optimisticData.find(r => r.id === id))
					.filter(element => element !== undefined) as Record[];
				return (
					<Column key={columnId} ref={columnRef} columnId={columnId}>
						<ColumnTitleWrapper>
							<Light />
							<ColumnTitle>
								{name} {`(${childId.length})`}
							</ColumnTitle>
						</ColumnTitleWrapper>
						{tasks.map(({ title, id: taskId }) => {
							const task = optimisticData.find(r => r.id === taskId);
							const totalSubtask = task === undefined ? 0 : task.childId.length;
							const completedSubtask =
								task === undefined
									? 0
									: task.childId.filter(
											({ id: subtaskId }) =>
												optimisticData.find(r => r.id === subtaskId)
													?.isCompleted === true,
									  ).length;
							const isTaskDragged =
								draggedTask !== null && draggedTask.taskId === taskId;
							return (
								<TaskWrapper key={taskId}>
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
										<Tasktitle
											style={{
												'--color': isTaskDragged ? '#3e3f4e' : undefined,
											}}
										>
											{title}
										</Tasktitle>
										<Subtitle
											style={{
												'--color': isTaskDragged ? '#3e3f4e' : undefined,
											}}
										>
											{completedSubtask} of {totalSubtask} substacks
										</Subtitle>
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
											<Tasktitle>{title}</Tasktitle>
										</Task>
									)}
								</TaskWrapper>
							);
						})}
					</Column>
				);
			})}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
`;

const ColumnTitleWrapper = styled.div`
	margin-bottom: 4px;
	display: flex;
	align-items: center;
	gap: 12px;
`;

const Light = styled.span`
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background: #49c4e5;
`;

const ColumnTitle = styled.span`
	color: #828fa3;
	font-size: calc(12 / 16 * 1rem);
	font-weight: 700;
	letter-spacing: 2.4px;
	text-transform: uppercase;
`;

const TaskWrapper = styled.div`
	position: relative;
`;

const Tasktitle = styled.span`
	color: var(--color, #fff);
	font-size: calc(15 / 16 * 1rem);
	font-weight: 700;
`;

const Subtitle = styled.span`
	color: var(--color, #828fa3);
	font-size: calc(12 / 16 * 1rem);
	font-weight: 700;
`;

export default Board;
