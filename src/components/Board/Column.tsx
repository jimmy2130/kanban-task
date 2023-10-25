'use client';
import * as React from 'react';
import styled from 'styled-components';
import { GAP } from './constants';

function Column(
	{ children, columnId }: { children: React.ReactNode; columnId: string },
	ref: any,
) {
	return (
		<Wrapper
			ref={node => {
				const map = ref.current;
				if (node) {
					map.set(columnId, { node, columnId });
				} else {
					map.delete(columnId);
				}
			}}
		>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	border: solid #979797 2px;
	border-radius: 4px;
	min-height: 200px;
	max-width: 300px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: ${GAP}px;
`;

export default React.forwardRef(Column);
