'use client';
import * as React from 'react';
import styled from 'styled-components';
import Column from './Column';
import Task from './Task';
import type { DataType } from './data3';
import useBoundingClientRect from './use-bounding-client-rect.hook';
import { POSITION } from './constants';

function Board({
	data,
	setData,
	boardId,
	setKey,
}: {
	boardId: string;
	data: DataType;
	setData: React.Dispatch<React.SetStateAction<DataType>>;
	setKey: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [columnRef, columnBoundaries] = useBoundingClientRect();
	const [taskRef, taskBoundaries] = useBoundingClientRect();
	const [startPosition, setStartPosition] = React.useState(POSITION);
	const [currentPosition, setCurrentPosition] = React.useState(POSITION);

	const board = data[boardId];
	const draggedTask = getDraggedTask(startPosition);
	const targetTask = getTargetTask(currentPosition);
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
		const gap =
			(filteredTaskBoundaries[1].top - filteredTaskBoundaries[0].bottom) / 2;
		const insertPositions = [filteredTaskBoundaries[0].top - gap];
		for (let i = 0; i < filteredTaskBoundaries.length; i++) {
			insertPositions.push(filteredTaskBoundaries[i].bottom + gap);
		}
		let closestDistance = Infinity;
		let closestIndex = -1;
		for (let i = 0; i < insertPositions.length; i++) {
			const distance = Math.abs(y - insertPositions[i]);
			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = i;
			}
		}
		return { columnId: targetColumnId, position: closestIndex };
	}

	function getTranslate(columnId: string, taskId: string) {
		if (draggedTask === null) {
			return { translateX: 0, translateY: 0 };
		}
		if (columnId === draggedTask.columnId && taskId === draggedTask.taskId) {
			return {
				translateX: currentPosition.x - startPosition.x,
				translateY: currentPosition.y - startPosition.y,
			};
		}
		let translateY = 0;
		const columnIndex = data[data[columnId].parentId].childId.findIndex(
			c => c === columnId,
		);
		const taskIndex = data[data[taskId].parentId].childId.findIndex(
			t => t === taskId,
		);
		if (columnId === draggedTask.columnId && taskIndex > draggedTask.position) {
			translateY -= draggedTask.height;
		}
		if (targetTask === null) {
			return { translateX: 0, translateY };
		}
		if (columnId === targetTask.columnId && taskIndex >= targetTask.position) {
			translateY += draggedTask.height;
		}
		return { translateX: 0, translateY };
	}

	// TODO: lift it up
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
		let deletePosition = nextData[oldColumnId].childId.findIndex(
			(id: string, position: number) =>
				id === draggedTask.taskId && position !== targetTask.position,
		);
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

	// TODO: Move this effect up
	React.useEffect(() => {
		// TODO: if nothing is dragged?
		function handlePointerUp() {
			swapTask();
			setKey(k => k + 1);
		}
		window.addEventListener('pointerup', handlePointerUp);
		return () => {
			window.removeEventListener('pointerup', handlePointerUp);
		};
	}, [swapTask, setKey]);

	const columns = board.childId.map(id => data[id]);

	return (
		<Wrapper>
			<BoardWrapper>
				{columns.map(({ name, id: columnId, childId }) => {
					const tasks = childId.map(id => data[id]);
					return (
						<Column key={columnId} ref={columnRef} columnId={columnId}>
							{tasks.map(({ title, id: taskId }) => {
								const { translateX, translateY } = getTranslate(
									columnId,
									taskId,
								);
								return (
									<Task
										key={taskId}
										ref={taskRef}
										columnId={columnId}
										taskId={taskId}
										style={{
											'--cursor':
												draggedTask !== null && targetTask === null
													? 'not-allowed'
													: 'pointer',
											'--x': `${translateX}px`,
											'--y': `${translateY}px`,
										}}
									>
										{title}
									</Task>
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
	height: 100%;
	background: #111;
	display: grid;
	place-content: center;
`;

const BoardWrapper = styled.div`
	display: flex;
	gap: 8px;
`;

export default Board;
