export type Boundary = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type DragObjectId = {
	taskId: number;
	columnId: number;
};

export type TargetTask =
	| { type: 'id'; taskId: number; columnId: number }
	| {
			type: 'position';
			x: number;
			y: number;
	  };

export const POSITION = { x: -1, y: -1 };

export const GAP = 20;
export const INDICATOR_HEIGHT = 4;
