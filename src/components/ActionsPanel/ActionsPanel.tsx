import React from 'react';
import styles from './ActionsPanel.module.css';
import UnstyledButton from '@/components/UnstyledButton';

function ActionsPanel({ bottom, right }: { bottom: number; right: number }) {
	return (
		<ul
			className={styles.actionsPanelWrapper}
			style={{ '--bottom': `${bottom}px`, '--right': `${right}px` }}
		>
			<li className={styles.action} style={{ '--color': '#828fa3' }}>
				<UnstyledButton className={styles.unstyledTopButton}>
					Edit Board
				</UnstyledButton>
			</li>
			<li className={styles.action} style={{ '--color': '#ea5555' }}>
				<UnstyledButton className={styles.unstyledBottomButton}>
					Delete Board
				</UnstyledButton>
			</li>
		</ul>
	);
}

export default ActionsPanel;
