'use client';
import * as React from 'react';
import styled from 'styled-components';

type Props = React.ComponentProps<'div'> & {
	columnId: string;
	taskId: string;
};

function Task({ children, columnId, taskId, ...delegated }: Props, ref: any) {
	return (
		<Wrapper
			ref={node => {
				const map = ref.current;
				if (node) {
					map.set(taskId, { node, columnId, taskId });
				} else {
					map.delete(taskId);
				}
			}}
			{...delegated}
		>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	padding: 8px;
	border-radius: 4px;
	border: 1px solid #979797;
	color: #979797;
	font-size: calc(16 / 16 * 1rem);
	transform: translate(var(--x), var(--y));
	user-select: none;

	&:hover {
		cursor: var(--cursor);
	}
`;

export default React.forwardRef(Task);
