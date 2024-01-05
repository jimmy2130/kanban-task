import React from 'react';
import styles from './Icon.module.css';

type Props = {
	width?: number;
	icon: () => React.JSX.Element;
};

function Icon({ icon: IconComponent, width = 48 }: Props) {
	return (
		<span style={{ '--width': `${width}px` }} className={styles.wrapper}>
			<IconComponent />
		</span>
	);
}

export default Icon;
