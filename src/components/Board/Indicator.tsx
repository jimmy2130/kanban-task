import React from 'react';
import { INDICATOR_HEIGHT } from './constants';
import styles from './Indicator.module.css';

function Indicator({
	top,
	left,
	width,
}: {
	top: number;
	left: number;
	width: number;
}) {
	return (
		<span
			style={{
				'--top': `${top}px`,
				'--left': `${left}px`,
				'--width': `${width}px`,
				'--indicator-height': `${INDICATOR_HEIGHT}px`,
			}}
			className={styles.wrapper}
		/>
	);
}

export default Indicator;
