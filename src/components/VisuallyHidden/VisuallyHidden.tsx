'use client';
import React from 'react';
import styled from 'styled-components';

type VisuallyHiddenProps<C extends React.ElementType> = {
	as?: C;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

function VisuallyHidden<C extends React.ElementType>({
	as,
	children,
	...delegated
}: VisuallyHiddenProps<C>) {
	return (
		<Wrapper as={as || 'span'} {...delegated}>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.span`
	position: absolute;
	overflow: hidden;
	clip: rect(0 0 0 0);
	height: 1px;
	width: 1px;
	margin: -1px;
	padding: 0;
	border: 0;
`;

export default VisuallyHidden;
