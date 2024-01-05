'use client';
import React from 'react';
import styles from './Header.module.css';
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import StyledButton from '@/components/StyledButton';
import UnstyledButton from '@/components/UnstyledButton';
import Icon from '@/components/Icon';
import VerticalEllipsis from '@/components/Icon/VerticalEllipsis';
import ActionsPanel from '@/components/ActionsPanel';
import ShiftBy from '@/components/ShiftBy';
import useClickOutside from '@/hooks/use-click-outside';

function Header() {
	const [showPanel, setShowPanel] = React.useState(false);
	const panelRef = React.useRef<HTMLDivElement>(null);

	const callback = React.useCallback(() => setShowPanel(false), []);
	useClickOutside(panelRef, callback);

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
			<div className={styles.border}></div>
			<div className={styles.headerSection}>
				<h2 className={styles.boardName}>Platform Launch</h2>
				<div className={styles.controlGroup}>
					<div className={styles.buttonWrapper}>
						<StyledButton variant="primary" size="large">
							<ShiftBy x={-5} y={-2}>
								+
							</ShiftBy>
							Add New Task
						</StyledButton>
					</div>
					<div className={styles.iconButtonWrapper} ref={panelRef}>
						<UnstyledButton onClick={() => setShowPanel(!showPanel)}>
							<Icon icon={VerticalEllipsis} width={37} />
						</UnstyledButton>
						{showPanel && <ActionsPanel bottom={-22} right={0} />}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
