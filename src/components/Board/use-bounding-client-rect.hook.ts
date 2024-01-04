import * as React from 'react';

type Boundary = {
	left: number;
	top: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
	taskId?: number;
	columnId: number;
};
import { type Record } from '@/types';

function useBoundingClientRect(
	data: Record[],
): [{ current: Map<any, any> }, Boundary[]] {
	const refs = React.useRef(new Map());
	const [boundaries, setBoundaries] = React.useState<Boundary[]>([]);

	React.useEffect(() => {
		if (!refs.current) {
			return;
		}
		const boundaries: Boundary[] = [];
		refs.current.forEach(({ node, ...delegated }) => {
			const { top, right, bottom, left, width, height } =
				node.getBoundingClientRect();
			boundaries.push({
				top,
				right,
				bottom,
				left,
				width,
				height,
				...delegated,
			});
		});
		setBoundaries(boundaries);
	}, [data]);

	return [refs, boundaries];
}

export default useBoundingClientRect;
