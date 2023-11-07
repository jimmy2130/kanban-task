'use client';
import * as React from 'react';
import styled from 'styled-components';
import { GAP } from './constants';

function Column(
	{ children, columnId }: { children: React.ReactNode; columnId: number },
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
	flex-basis: 280px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	gap: ${GAP}px;
	padding-bottom: 20px;
	padding-left: 12px;
	padding-right: 12px;
`;

export default React.forwardRef(Column);
