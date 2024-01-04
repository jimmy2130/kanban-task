import React from 'react';
import styles from './Header.module.css';
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import Button from '@/components/Button';

function Header() {
	return (
		<header className={styles.wrapper}>
			<div className={styles.logoSection}>
				<div className={styles.logoWrapper}>
					<Logo />
				</div>
				<VisuallyHidden>
					<h1>Kanban Task Management</h1>
				</VisuallyHidden>
			</div>
			<div className={styles.headerSection}>
				<h2 className={styles.boardName}>Platform Launch</h2>
				<div className={styles.controlGroup}>
					<Button variant="primary" size="large" className={styles.button}>
						Add New Task
					</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;
