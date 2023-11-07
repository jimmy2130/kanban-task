type ChildId = { id: number; order: number };
export type Record = {
	id: number;
	type: string;
	childId: ChildId[];
	parentId: number | null;
	name: string | null;
	title: string | null;
	description: string | null;
	status: string | null;
	isCompleted: boolean | null;
};

export type SwapRequest = {
	taskId: number;
	oldColumnId: number;
	newColumnId: number;
	targetPosition: number;
};
