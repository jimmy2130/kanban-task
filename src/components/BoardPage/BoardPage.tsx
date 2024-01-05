import React from 'react';
import Aside from '@/components/Aside';
import Header from '@/components/Header';
import Board from '@/components/Board';
import { type Record } from '@/types';
import styles from './BoardPage.module.css';

function BoardPage({ records }: { records: Record[] }) {
	return (
		<div className={styles.wrapper}>
			<Aside />
			<div>
				<Header />
				<div className={styles.boardWrapper} style={{ paddingLeft: '320px' }}>
					<Board boardName={'Platform Launch'} serverData={records} />
				</div>
			</div>
		</div>
	);
}

export default BoardPage;
