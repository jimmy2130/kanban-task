'use client';
import * as React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { DATA } from './data';
import { type Boundary, GAP } from './constants';

const BOUNDARY = {
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
};

function List() {
	const listRef = React.useRef<HTMLDivElement>(null);
	const itemsRef = React.useRef(new Map());
	const [listItems, setListItems] = React.useState(DATA);
	const [listBoundary, setListBoundary] = React.useState(BOUNDARY);
	const [itemsBoundary, setItemsBoundary] = React.useState<Boundary[]>([]);
	const [draggedId, setDraggedId] = React.useState<null | number>(null);
	const [dragTargetId, rawSetDragTargetId] = React.useState<null | number>(
		null,
	);

	function changeListItemsOrder(
		originalId: number | null,
		targetId: number | null,
	) {
		if (originalId === null || targetId === null) {
			return;
		}
		const originalOrder = listItems.findIndex(item => item.id === originalId);
		const targetOrder = listItems.findIndex(item => item.id === targetId);
		if (originalOrder === -1 || targetOrder === -1) {
			return;
		}
		let nextListItems = [];
		if (targetOrder === null || originalOrder === targetOrder) {
			nextListItems = [...listItems];
		} else if (originalOrder > targetOrder) {
			nextListItems = [
				...listItems.slice(0, targetOrder),
				listItems[originalOrder],
				...listItems.slice(targetOrder, originalOrder),
				...listItems.slice(originalOrder + 1),
			];
		} else if (originalOrder < targetOrder) {
			nextListItems = [
				...listItems.slice(0, originalOrder),
				...listItems.slice(originalOrder + 1, targetOrder + 1),
				listItems[originalOrder],
				...listItems.slice(targetOrder + 1),
			];
		} else {
			throw new Error(
				`changeListItemsOrder Error! originalOrder: ${originalOrder}, targetOrder: ${targetOrder}`,
			);
		}
		setListItems(nextListItems);
	}

	function setDragTargetId({
		type,
		value,
	}: {
		type: 'order' | 'id';
		value: number | null;
	}) {
		if (value === null) {
			rawSetDragTargetId(null);
		} else if (type === 'order') {
			rawSetDragTargetId(listItems[value].id);
		} else if (type === 'id') {
			rawSetDragTargetId(value);
		}
	}

	function getTransFormYDistance(
		id: number,
		draggedId: number,
		dragTargetId: number | null,
	) {
		if (draggedId === dragTargetId) {
			return 0;
		}
		const draggedOrder = listItems.findIndex(item => item.id === draggedId);
		const dragTargetOrder = listItems.findIndex(
			item => item.id === dragTargetId,
		);
		const order = listItems.findIndex(item => item.id === id);
		const { bottom, top } = itemsBoundary[draggedOrder];
		const displacement = bottom - top + GAP;
		// out of boundary
		if (dragTargetOrder === -1) {
			if (order < draggedOrder) {
				return 0;
			}
			return -displacement;
		}
		// in boundary
		if (order > draggedOrder && order > dragTargetOrder) {
			return 0;
		}
		if (order < draggedOrder && order < dragTargetOrder) {
			return 0;
		}
		if (draggedOrder > dragTargetOrder) {
			return displacement;
		}
		if (draggedOrder < dragTargetOrder) {
			return -displacement;
		}
		console.log(
			`getTransFormYDistance Error! order: ${order}, draggedOrder: ${draggedOrder}, dragTargetOrder: ${dragTargetOrder}`,
		);
		return 0;
	}

	React.useEffect(() => {
		if (!listRef.current) {
			return;
		}
		const { top, right, bottom, left } =
			listRef.current.getBoundingClientRect();
		setListBoundary({ top, right, bottom, left });
	}, []);

	React.useEffect(() => {
		if (!itemsRef.current) {
			return;
		}
		const boundaries: Boundary[] = [];
		itemsRef.current.forEach(value => {
			const { top, right, bottom, left } = value.getBoundingClientRect();
			boundaries.push({ top, right, bottom, left });
		});
		setItemsBoundary(boundaries);
	}, []);

	return (
		<Wrapper>
			<ListWrapper ref={listRef}>
				{listItems.map(({ id, backgroundColor }, order) => (
					<Item
						key={id}
						id={id}
						ref={itemsRef}
						backgroundColor={backgroundColor}
						listBoundary={listBoundary}
						itemsBoundary={itemsBoundary}
						draggedId={draggedId}
						setDraggedId={setDraggedId}
						dragTargetId={dragTargetId}
						setDragTargetId={setDragTargetId}
						changeListItemsOrder={changeListItemsOrder}
						getTransFormYDistance={getTransFormYDistance}
					>
						{id}
					</Item>
				))}
			</ListWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	background: #111;
	display: grid;
	place-content: center;
`;

const ListWrapper = styled.div`
	border: solid white 6px;
	border-radius: 4px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: ${GAP}px;
`;

export default List;
