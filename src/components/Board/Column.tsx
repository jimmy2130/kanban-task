import React from 'react';
import { GAP } from './constants';
import styles from './Column.module.css';

function Column(
	{ children, columnId }: { children: React.ReactNode; columnId: number },
	ref: any,
) {
	return (
		<div
			ref={node => {
				const map = ref.current;
				if (node) {
					map.set(columnId, { node, columnId });
				} else {
					map.delete(columnId);
				}
			}}
			style={{ '--gap': `${GAP}px` }}
			className={styles.wrapper}
		>
			{children}
		</div>
	);
}

export default React.forwardRef(Column);
