import * as React from 'react';
import styles from './Button.module.css';

type Props = {
	variant: 'primary' | 'secondary' | 'destructive';
	size: 'large' | 'small';
	children: React.ReactNode;
	className: string;
};

const BACKGROUND_VARIANTS = {
	primary: '#635fc7',
	secondary: '#f4f7fd',
	destructive: '#ea5555',
};

const BACKGROUND_VARIANTS_HOVER = {
	primary: '#a8a4ff',
	secondary: 'hsl(242deg 48% 58% / 0.25)',
	destructive: '#ff9898',
};

const TEXT_VARIANTS = {
	primary: 'white',
	secondary: '#635fc7',
	destructive: 'white',
};

const SIZE = {
	large: '48px',
	small: '40px',
};

function Button({ variant, size, children, className }: Props) {
	return (
		<button
			className={`${styles.wrapper} ${className}`}
			style={{
				'--height': SIZE[size],
				'--background-color': BACKGROUND_VARIANTS[variant],
				'--background-color-hover': BACKGROUND_VARIANTS_HOVER[variant],
				'--text-color': TEXT_VARIANTS[variant],
			}}
		>
			{children}
		</button>
	);
}

export default Button;
