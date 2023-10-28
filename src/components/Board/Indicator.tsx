'use client';
import * as React from 'react';
import styled from 'styled-components';
import { INDICATOR_HEIGHT } from './constants';

function Indicator({ ...delegated }) {
	return <Wrapper {...delegated} />;
}

const Wrapper = styled.span`
	--indicator-height: ${INDICATOR_HEIGHT}px;
	position: fixed;
	top: calc(var(--top) - var(--indicator-height) / 2);
	left: var(--left);
	width: calc(var(--width, 280px) - 12px * 2);
	height: var(--indicator-height);
	background: white;
	border-radius: calc(var(--indicator-height) / 2);
`;

export default Indicator;
