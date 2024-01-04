import React from 'react';
import Board from '@/components/Board';
import { type Record } from '@/types';
import styles from './BoardPage.module.css';

function BoardPage({ records }: { records: Record[] }) {
	return (
		<div className={styles.wrapper}>
			<Board boardName={'Platform Launch'} serverData={records} />
		</div>
	);
}

export default BoardPage;
