import * as React from 'react';
import styles from './ShiftBy.module.css';

type Props = {
	x?: number;
	y?: number;
	children: React.ReactNode;
};

function ShiftBy({ x = 0, y = 0, children }: Props) {
	return (
		<span
			className={styles.wrapper}
			style={{ '--x': `${x}px`, '--y': `${y}px` }}
		>
			{children}
		</span>
	);
}

export default ShiftBy;
