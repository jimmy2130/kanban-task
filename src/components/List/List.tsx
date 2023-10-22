'use client';
import * as React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { DATA } from './data';
const GAP = 16;
type Boundary = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

function List() {
	const listRef = React.useRef<HTMLDivElement>(null);
	const [listItems, setListItems] = React.useState(DATA);
	const [listBoundary, setListBoundary] = React.useState({
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	});
	const [itemsBoundary, rawSetItemsBoundary] = React.useState([
		{
			top: 247,
			right: 540.5,
			bottom: 307,
			left: 480.5,
		},
		{
			top: 323,
			right: 540.5,
			bottom: 383,
			left: 480.5,
		},
		{
			top: 399,
			right: 540.5,
			bottom: 459,
			left: 480.5,
		},
		{
			top: 475,
			right: 540.5,
			bottom: 535,
			left: 480.5,
		},
		{
			top: 551,
			right: 540.5,
			bottom: 611,
			left: 480.5,
		},
	]);
	const [draggedId, setDraggedId] = React.useState<null | number>(null);
	const [dragTargetId, rawSetDragTargetId] = React.useState<null | number>(
		null,
	);

	function setItemsBoundary(
		order: number,
		boundary: { left: number; right: number; top: number; bottom: number },
	) {
		console.log(order, boundary);
		const nextItemsBoundary = JSON.parse(JSON.stringify(itemsBoundary));
		nextItemsBoundary[order] = JSON.parse(JSON.stringify(boundary));
		console.log(nextItemsBoundary);
		rawSetItemsBoundary(nextItemsBoundary);
	}

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

	function setDragTargetId(order: number | null) {
		if (order === null) {
			rawSetDragTargetId(null);
		} else {
			rawSetDragTargetId(listItems[order].id);
		}
	}

	function getTransFormYDistance(
		id: number,
		draggedId: number,
		dragTargetId: number | null,
		itemsBoundary: Boundary[],
	) {
		if (draggedId === dragTargetId) {
			return 0;
		}
		const draggedOrder = listItems.findIndex(item => item.id === draggedId);
		const dragTargetOrder = listItems.findIndex(
			item => item.id === dragTargetId,
		);
		const order = listItems.findIndex(item => item.id === id);
		if (draggedOrder === -1 || dragTargetOrder === -1 || order === -1) {
			return 0;
		}
		const { bottom, top } = itemsBoundary[draggedOrder];
		if (dragTargetOrder === null) {
			if (order < draggedOrder) {
				return 0;
			}
			return -(bottom - top) - GAP;
		}
		if (order > draggedOrder && order > dragTargetOrder) {
			return 0;
		}
		if (order < draggedOrder && order < dragTargetOrder) {
			return 0;
		}
		if (draggedOrder > dragTargetOrder) {
			return bottom - top + GAP;
		}
		if (draggedOrder < dragTargetOrder) {
			return -(bottom - top) - GAP;
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

	return (
		<Wrapper>
			<ListWrapper ref={listRef}>
				{listItems.map(({ id, backgroundColor }, order) => (
					<Item
						key={id}
						id={id}
						backgroundColor={backgroundColor}
						listBoundary={listBoundary}
						itemsBoundary={itemsBoundary}
						setItemsBoundary={setItemsBoundary}
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
	gap: 16px;
`;

export default List;
