'use client';
import * as React from 'react';
import Board from '@/components/Board';
import { DATA } from '@/components/Board/data3';

export default function Home() {
	const [data, setData] = React.useState(DATA);
	const [key, setKey] = React.useState(1);
	return (
		<Board
			data={data}
			setData={setData}
			boardId={'b01'}
			key={key}
			setKey={setKey}
		/>
	);
}
