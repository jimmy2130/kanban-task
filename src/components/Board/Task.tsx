import React from 'react';
import styles from './Task.module.css';

type Props = React.ComponentProps<'div'> & {
	columnId: number;
	taskId: number;
	handlePointerDown?: ({ clientX, clientY }: React.PointerEvent) => void;
	handlePointerUp?: () => void;
};

function Task(
	{
		children,
		columnId,
		taskId,
		handlePointerDown,
		handlePointerUp,
		...delegated
	}: Props,
	ref: any,
) {
	return (
		<div
			className={styles.wrapper}
			ref={
				ref !== null
					? node => {
							const map = ref.current;
							if (node) {
								map.set(taskId, { node, columnId, taskId });
							} else {
								map.delete(taskId);
							}
					  }
					: null
			}
			{...delegated}
			onPointerDown={(e: React.PointerEvent) => {
				if (handlePointerDown) {
					handlePointerDown(e);
				}
			}}
			onPointerUp={handlePointerUp}
		>
			{children}
		</div>
	);
}

export default React.forwardRef(Task);
