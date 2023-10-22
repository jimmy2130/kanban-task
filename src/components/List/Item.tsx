import React from 'react';
import styled from 'styled-components';

const POSITION = { x: -1, y: -1 };

type Boundary = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

function isOut(
	{ x, y }: { x: number; y: number },
	{ left, right, top, bottom }: Boundary,
) {
	if (x === -1 && y === -1) {
		return false;
	}
	if (x < left || x > right || y < top || y > bottom) {
		return true;
	}
	return false;
}

function getDragTargetOrder(
	{ x, y }: { x: number; y: number },
	itemsBoundary: Boundary[],
	listBoundary: Boundary,
) {
	if (isOut({ x, y }, listBoundary)) {
		return null;
	}
	for (let i = 0; i < itemsBoundary.length - 1; i++) {
		if (y < (itemsBoundary[i].bottom + itemsBoundary[i + 1].top) / 2) {
			return i;
		}
	}
	return itemsBoundary.length - 1;
}

function Item(
	{
		id,
		backgroundColor,
		listBoundary,
		itemsBoundary,
		draggedId,
		setDraggedId,
		dragTargetId,
		setDragTargetId,
		changeListItemsOrder,
		getTransFormYDistance,
		children,
	}: {
		id: number;
		backgroundColor: string;
		listBoundary: Boundary;
		itemsBoundary: Boundary[];
		draggedId: null | number;
		setDraggedId: (order: number | null) => void;
		dragTargetId: null | number;
		setDragTargetId: ({
			type,
			value,
		}: {
			type: 'order' | 'id';
			value: number | null;
		}) => void;
		changeListItemsOrder: (
			originalOrder: number | null,
			targetOrder: number | null,
		) => void;
		getTransFormYDistance: (
			id: number,
			draggedId: number,
			dragTargetId: number | null,
		) => number;
		children: React.ReactNode;
	},
	ref: any,
) {
	const [isDragging, setIsDragging] = React.useState(false);
	const [startPosition, setStartPosition] = React.useState(POSITION);
	const [currentPosition, setCurrentPosition] = React.useState(POSITION);

	const isOutOfBoundary = isOut(currentPosition, listBoundary);

	React.useEffect(() => {
		function handlePointerDown({ clientX, clientY }: PointerEvent) {
			setIsDragging(true);
			setStartPosition({ x: clientX, y: clientY });
			setCurrentPosition({ x: clientX, y: clientY });
			setDraggedId(id);
			setDragTargetId({ type: 'id', value: id });
		}
		ref.current.get(id).addEventListener('pointerdown', handlePointerDown);
		return () => {
			ref.current.get(id).removeEventListener('pointerdown', handlePointerDown);
		};
	}, [currentPosition, startPosition]);

	React.useEffect(() => {
		if (!isDragging) {
			return;
		}
		function handlePointermove({ clientX, clientY }: PointerEvent) {
			setCurrentPosition({ x: clientX, y: clientY });
			setDragTargetId({
				type: 'order',
				value: getDragTargetOrder(
					{ x: clientX, y: clientY },
					itemsBoundary,
					listBoundary,
				),
			});
		}
		window.addEventListener('pointermove', handlePointermove);
		return () => {
			window.removeEventListener('pointermove', handlePointermove);
		};
	}, [isDragging]);

	React.useEffect(() => {
		function handlePointerUp() {
			setIsDragging(false);
			setStartPosition(POSITION);
			setCurrentPosition(POSITION);
			setDraggedId(null);
			setDragTargetId({ type: 'order', value: null });

			changeListItemsOrder(draggedId, dragTargetId);
		}
		window.addEventListener('pointerup', handlePointerUp);
		return () => {
			window.removeEventListener('pointerup', handlePointerUp);
		};
	}, [currentPosition, startPosition]);

	return (
		<Wrapper
			style={{
				'--x': `${currentPosition.x - startPosition.x}px`,
				'--y': isDragging
					? `${currentPosition.y - startPosition.y}px`
					: draggedId !== null
					? `${getTransFormYDistance(id, draggedId, dragTargetId)}px`
					: '0px',
				'--background': backgroundColor,
				'--cursor': isOutOfBoundary ? 'not-allowed' : 'pointer',
				'--zIndex': isDragging ? 2 : 1,
			}}
			ref={node => {
				const map = ref.current;
				if (node) {
					map.set(id, node);
				} else {
					map.delete(id);
				}
			}}
		>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 4px;
	background: var(--background);
	transform: translate(var(--x), var(--y));
	z-index: var(--zIndex);

	&:hover {
		cursor: var(--cursor);
	}

	display: grid;
	place-content: center;
	font-size: calc(24 / 16 * 1rem);
`;

export default React.forwardRef(Item);
