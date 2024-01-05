import * as React from 'react';
import styles from './StyledButton.module.css';

type Props = {
	variant: 'primary' | 'secondary' | 'destructive';
	size: 'large' | 'small';
	children: React.ReactNode;
	className?: string;
};

const SIZE = {
	large: '48px',
	small: '40px',
};

function Button({ variant, size, children, className }: Props) {
	let buttonStyle;
	if (variant === 'primary') {
		buttonStyle = styles.primaryButton;
	} else if (variant === 'secondary') {
		buttonStyle = styles.secondaryButton;
	} else if (variant === 'destructive') {
		buttonStyle = styles.destructiveButton;
	} else {
		throw new Error(`unknown variant: ${variant}`);
	}
	return (
		<button
			className={`${buttonStyle} ${className}`}
			style={{
				'--height': SIZE[size],
			}}
		>
			{children}
		</button>
	);
}

export default Button;
