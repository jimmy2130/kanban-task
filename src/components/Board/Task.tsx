'use client';
import * as React from 'react';
import styled from 'styled-components';

type Props = React.ComponentProps<'div'> & {
	columnId: number;
	taskId: number;
	handlePointerDown?: ({ clientX, clientY }: React.PointerEvent) => void;
	handlePointerUp?: () => void;
};

function Task(
	{
		children,
		columnId,
		taskId,
		handlePointerDown,
		handlePointerUp,
		...delegated
	}: Props,
	ref: any,
) {
	return (
		<Wrapper
			ref={
				ref !== null
					? node => {
							const map = ref.current;
							if (node) {
								map.set(taskId, { node, columnId, taskId });
							} else {
								map.delete(taskId);
							}
					  }
					: null
			}
			{...delegated}
			onPointerDown={(e: React.PointerEvent) => {
				if (handlePointerDown) {
					handlePointerDown(e);
				}
			}}
			onPointerUp={handlePointerUp}
		>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	padding: 24px 16px;
	border-radius: 8px;
	transform: translate(var(--x, 0), var(--y, 0));
	user-select: none;
	background: var(--background, #2b2c37);
	filter: drop-shadow(0px 4px 6px hsl(220deg 40% 35% / 0.1015));

	display: flex;
	flex-direction: column;
	gap: 8px;

	touch-action: none;

	&:hover {
		cursor: var(--cursor);
	}
`;

export default React.forwardRef(Task);
