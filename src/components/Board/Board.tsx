'use client';
import * as React from 'react';
import styled from 'styled-components';
import Column from './Column';
import Task from './Task';
import { DATA } from './data3';
import useBoundingClientRect from './use-bounding-client-rect.hook';
import { POSITION, GAP, INDICATOR_HEIGHT, type Boundary } from './constants';

function Board({ boardId }: { boardId: string }) {
	const [data, setData] = React.useState(DATA);
	const [startPosition, setStartPosition] = React.useState(POSITION);
	const [currentPosition, setCurrentPosition] = React.useState(POSITION);
	const [columnRef, columnBoundaries] = useBoundingClientRect(startPosition);
	const [taskRef, taskBoundaries] = useBoundingClientRect(startPosition);

	const board = data[boardId];
	const draggedTask = getDraggedTask(startPosition);
	const targetTask = getTargetTask(currentPosition);
	const indicatorPosition = getIndicatorPosition();
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
		let targetColumnId = '';
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

	function swapTask() {
		if (draggedTask === null) {
			return;
		}
		const nextData = JSON.parse(JSON.stringify(data));
		if (targetTask === null) {
			setData(nextData);
			return;
		}
		const oldColumnId = draggedTask.columnId;
		const newColumnId = targetTask.columnId;

		if (draggedTask.taskId === undefined) {
			return;
		}
		nextData[draggedTask.taskId].parentId = newColumnId;
		nextData[newColumnId].childId = [
			...nextData[newColumnId].childId.slice(0, targetTask.position),
			draggedTask.taskId,
			...nextData[newColumnId].childId.slice(targetTask.position),
		];
		let deletePosition = -1;
		if (oldColumnId === newColumnId) {
			deletePosition = nextData[oldColumnId].childId.findIndex(
				(id: string, position: number) =>
					id === draggedTask.taskId && position !== targetTask.position,
			);
		} else {
			deletePosition = nextData[oldColumnId].childId.findIndex(
				(id: string) => id === draggedTask.taskId,
			);
		}
		nextData[oldColumnId].childId = [
			...nextData[oldColumnId].childId.slice(0, deletePosition),
			...nextData[oldColumnId].childId.slice(deletePosition + 1),
		];
		setData(nextData);
	}

	React.useEffect(() => {
		function isTaskSelected({ x, y }: typeof POSITION) {
			for (let i = 0; i < taskBoundaries.length; i++) {
				const { top, bottom, left, right } = taskBoundaries[i];
				if (x >= left && x <= right && y >= top && y <= bottom) {
					return true;
				}
			}
			return false;
		}
		function handlePointerDown({ clientX, clientY }: PointerEvent) {
			if (!isTaskSelected({ x: clientX, y: clientY })) {
				return;
			}
			setStartPosition({ x: clientX, y: clientY });
			setCurrentPosition({ x: clientX, y: clientY });
		}
		window.addEventListener('pointerdown', handlePointerDown);
		return () => {
			window.removeEventListener('pointerdown', handlePointerDown);
		};
	}, [taskBoundaries]);

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

	React.useEffect(() => {
		function handlePointerUp() {
			setStartPosition(POSITION);
			setCurrentPosition(POSITION);
			swapTask();
		}
		window.addEventListener('pointerup', handlePointerUp);
		return () => {
			window.removeEventListener('pointerup', handlePointerUp);
		};
	}, [swapTask]);

	const columns = board.childId.map(id => data[id]);

	return (
		<Wrapper>
			<BoardWrapper>
				{indicatorPosition !== null && (
					<Indicator
						style={{
							'--top': `${indicatorPosition.top}px`,
							'--left': `${indicatorPosition.left}px`,
						}}
					/>
				)}
				{columns.map(({ name, id: columnId, childId }) => {
					const tasks = childId.map(id => data[id]);
					return (
						<Column key={columnId} ref={columnRef} columnId={columnId}>
							<ColumnTitleWrapper>
								<Light />
								<ColumnTitle>
									{name} {`(${childId.length})`}
								</ColumnTitle>
							</ColumnTitleWrapper>
							{tasks.map(({ title, id: taskId }) => {
								const totalSubtask = data[taskId].childId.length;
								const completedSubtask = data[taskId].childId.filter(
									subtaskId => data[subtaskId].isCompleted === true,
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
											>
												<Tasktitle>{title}</Tasktitle>
												<Subtitle
													style={{
														'--color': isTaskDragged ? 'white' : '#828fa3',
													}}
												>
													{completedSubtask} of {totalSubtask} substacks
												</Subtitle>
											</Task>
										)}
									</TaskWrapper>
								);
							})}
						</Column>
					);
				})}
			</BoardWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	background: #000112;
	padding: 24px 12px;
	min-height: 100%;
`;

const BoardWrapper = styled.div`
	display: flex;
`;

const Indicator = styled.span`
	--indicator-height: ${INDICATOR_HEIGHT}px;
	position: fixed;
	top: calc(var(--top) - var(--indicator-height) / 2);
	left: var(--left);
	width: calc(280px - 12px * 2);
	height: var(--indicator-height);
	background: white;
	border-radius: calc(var(--indicator-height) / 2);
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
