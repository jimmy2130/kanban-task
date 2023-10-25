import * as React from 'react';

type Boundary = {
	left: number;
	top: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
	taskId?: string;
	columnId: string;
};

const map: Map<'a' | 'b', number> = new Map();
map.set('a', 1);
map.set('b', 2);

// TODO: what if window size is resized or scrolled?

function useBoundingClientRect(): [{ current: Map<any, any> }, Boundary[]] {
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
	}, []);

	return [refs, boundaries];
}

export default useBoundingClientRect;
