'use client';
import * as React from 'react';
import Board from '@/components/Board';
import styled from 'styled-components';
import { type Record } from '@/constants';

function BoardPage({ records }: { records: Record[] }) {
	return (
		<Wrapper>
			<Board boardName={'Platform Launch'} serverData={records} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	background: #000112;
	padding: 24px 12px;
	min-height: 100%;
`;

export default BoardPage;
