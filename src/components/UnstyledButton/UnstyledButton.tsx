import React from 'react';
import styles from './UnstyledButton.module.css';

type Props = {
	className?: string;
	children: React.ReactNode;
	delegated?: React.ComponentPropsWithoutRef<'button'>;
};

function UnstyledButton({ className, children, ...delegated }: Props) {
	return (
		<button className={`${styles.unstyledButton} ${className}`} {...delegated}>
			{children}
		</button>
	);
}

export default UnstyledButton;
