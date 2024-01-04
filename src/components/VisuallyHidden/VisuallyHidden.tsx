import React from 'react';
import styles from './VisuallyHidden.module.css';

type VisuallyHiddenProps<C extends React.ElementType> = {
	as?: C;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

function VisuallyHidden<C extends React.ElementType>({
	as,
	children,
	...delegated
}: VisuallyHiddenProps<C>) {
	const Tag = as || 'span';
	return (
		<Tag className={styles.wrapper} {...delegated}>
			{children}
		</Tag>
	);
}

export default VisuallyHidden;
