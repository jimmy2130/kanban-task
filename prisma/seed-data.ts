type ChildId = { id: number; order: number };

type Record = {
	data: {
		type: string;
		childId: { create: ChildId[] };
		parentId?: number;
		name?: string;
		title?: string;
		description?: string;
		status?: string;
		isCompleted?: boolean;
	};
};

export const DATA: Record[] = [
	{
		data: {
			type: 'root',
			childId: {
				create: [
					{ id: 2, order: 0 },
					{ id: 59, order: 1 },
					{ id: 79, order: 2 },
				],
			},
		},
	},
	{
		data: {
			type: 'board',
			name: 'Platform Launch',
			childId: {
				create: [
					{ id: 3, order: 0 },
					{ id: 16, order: 1 },
					{ id: 39, order: 2 },
				],
			},
			parentId: 1,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Todo',
			childId: {
				create: [
					{ id: 4, order: 0 },
					{ id: 8, order: 1 },
					{ id: 10, order: 2 },
					{ id: 13, order: 3 },
				],
			},
			parentId: 2,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Build UI for onboarding flow',
			description: '',
			status: 'Todo',
			childId: {
				create: [
					{ id: 5, order: 0 },
					{ id: 6, order: 1 },
					{ id: 7, order: 2 },
				],
			},
			parentId: 3,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Sign up page',
			isCompleted: true,
			childId: { create: [] },
			parentId: 4,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Sign in page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 4,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Welcome page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 4,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Build UI for search',
			description: '',
			status: 'Todo',
			childId: { create: [{ id: 9, order: 0 }] },
			parentId: 3,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Search page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 8,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Build settings UI',
			description: '',
			status: 'Todo',
			childId: {
				create: [
					{ id: 11, order: 0 },
					{ id: 12, order: 1 },
				],
			},
			parentId: 3,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Account page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 10,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Billing page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 10,
		},
	},
	{
		data: {
			type: 'task',
			title: 'QA and test all major user journeys',
			description:
				'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
			status: 'Todo',
			childId: {
				create: [
					{ id: 14, order: 0 },
					{ id: 15, order: 1 },
				],
			},
			parentId: 3,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Internal testing',
			isCompleted: false,
			childId: { create: [] },
			parentId: 13,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'External testing',
			isCompleted: false,
			childId: { create: [] },
			parentId: 13,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Doing',
			childId: {
				create: [
					{ id: 17, order: 0 },
					{ id: 21, order: 1 },
					{ id: 25, order: 2 },
					{ id: 29, order: 3 },
					{ id: 32, order: 4 },
					{ id: 35, order: 5 },
				],
			},
			parentId: 2,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Design settings and search pages',
			description: '',
			status: 'Doing',
			childId: {
				create: [
					{ id: 18, order: 0 },
					{ id: 19, order: 1 },
					{ id: 20, order: 2 },
				],
			},
			parentId: 16,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Settings - Account page',
			isCompleted: true,
			childId: { create: [] },
			parentId: 17,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Settings - Billing page',
			isCompleted: true,
			childId: { create: [] },
			parentId: 17,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Search page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 17,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Add account management endpoints',
			description: '',
			status: 'Doing',
			childId: {
				create: [
					{ id: 22, order: 0 },
					{ id: 23, order: 1 },
					{ id: 24, order: 2 },
				],
			},
			parentId: 16,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Upgrade plan',
			isCompleted: true,
			childId: { create: [] },
			parentId: 21,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Cancel plan',
			isCompleted: true,
			childId: { create: [] },
			parentId: 21,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Update payment method',
			isCompleted: false,
			childId: { create: [] },
			parentId: 21,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Design onboarding flow',
			description: '',
			status: 'Doing',
			childId: {
				create: [
					{ id: 26, order: 0 },
					{ id: 27, order: 1 },
					{ id: 28, order: 2 },
				],
			},
			parentId: 16,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Sign up page',
			isCompleted: true,
			childId: { create: [] },
			parentId: 25,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Sign in page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 25,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Welcome page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 25,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Add search enpoints',
			description: '',
			status: 'Doing',
			childId: {
				create: [
					{ id: 30, order: 0 },
					{ id: 31, order: 1 },
				],
			},
			parentId: 16,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Add search endpoint',
			isCompleted: true,
			childId: { create: [] },
			parentId: 29,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Define search filters',
			isCompleted: false,
			childId: { create: [] },
			parentId: 29,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Add authentication endpoints',
			description: '',
			status: 'Doing',
			childId: {
				create: [
					{ id: 33, order: 0 },
					{ id: 34, order: 1 },
				],
			},
			parentId: 16,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Define user model',
			isCompleted: true,
			childId: { create: [] },
			parentId: 32,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Add auth endpoints',
			isCompleted: false,
			childId: { create: [] },
			parentId: 32,
		},
	},
	{
		data: {
			type: 'task',
			title:
				'Research pricing points of various competitors and trial different business models',
			description:
				"We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
			status: 'Doing',
			childId: {
				create: [
					{ id: 36, order: 0 },
					{ id: 37, order: 1 },
					{ id: 38, order: 2 },
				],
			},
			parentId: 16,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Research competitor pricing and business models',
			isCompleted: true,
			childId: { create: [] },
			parentId: 35,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Outline a business model that works for our solution',
			isCompleted: false,
			childId: { create: [] },
			parentId: 35,
		},
	},
	{
		data: {
			type: 'subtask',
			title:
				'Talk to potential customers about our proposed solution and ask for fair price expectancy',
			isCompleted: false,
			childId: { create: [] },
			parentId: 35,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Done',
			childId: {
				create: [
					{ id: 40, order: 0 },
					{ id: 42, order: 1 },
					{ id: 44, order: 2 },
					{ id: 48, order: 3 },
					{ id: 51, order: 4 },
					{ id: 53, order: 5 },
					{ id: 56, order: 6 },
				],
			},
			parentId: 2,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Conduct 5 wireframe tests',
			description:
				'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
			status: 'Done',
			childId: { create: [{ id: 41, order: 0 }] },
			parentId: 39,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Complete 5 wireframe prototype tests',
			isCompleted: true,
			childId: { create: [] },
			parentId: 40,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Create wireframe prototype',
			description:
				'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
			status: 'Done',
			childId: { create: [{ id: 43, order: 0 }] },
			parentId: 39,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Create clickable wireframe prototype in Balsamiq',
			isCompleted: true,
			childId: { create: [] },
			parentId: 42,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Review results of usability tests and iterate',
			description:
				"Keep iterating through the subtasks until we're clear on the core concepts for the app.",
			status: 'Done',
			childId: {
				create: [
					{ id: 45, order: 0 },
					{ id: 46, order: 1 },
					{ id: 47, order: 2 },
				],
			},
			parentId: 39,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Meet to review notes from previous tests and plan changes',
			isCompleted: true,
			childId: { create: [] },
			parentId: 44,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Make changes to paper prototypes',
			isCompleted: true,
			childId: { create: [] },
			parentId: 44,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Conduct 5 usability tests',
			isCompleted: true,
			childId: { create: [] },
			parentId: 44,
		},
	},
	{
		data: {
			type: 'task',
			title:
				'Create paper prototypes and conduct 10 usability tests with potential customers',
			description: '',
			status: 'Done',
			childId: {
				create: [
					{ id: 49, order: 0 },
					{ id: 50, order: 1 },
				],
			},
			parentId: 39,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Create paper prototypes for version one',
			isCompleted: true,
			childId: { create: [] },
			parentId: 48,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Complete 10 usability tests',
			isCompleted: true,
			childId: { create: [] },
			parentId: 48,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Market discovery',
			description:
				'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
			status: 'Done',
			childId: { create: [{ id: 52, order: 0 }] },
			parentId: 39,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Interview 10 prospective customers',
			isCompleted: true,
			childId: { create: [] },
			parentId: 51,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Competitor analysis',
			description: '',
			status: 'Done',
			childId: {
				create: [
					{ id: 54, order: 0 },
					{ id: 55, order: 1 },
				],
			},
			parentId: 39,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Find direct and indirect competitors',
			isCompleted: true,
			childId: { create: [] },
			parentId: 53,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'SWOT analysis for each competitor',
			isCompleted: true,
			childId: { create: [] },
			parentId: 53,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Research the market',
			description:
				'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
			status: 'Done',
			childId: {
				create: [
					{ id: 57, order: 0 },
					{ id: 58, order: 1 },
				],
			},
			parentId: 39,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Write up research analysis',
			isCompleted: true,
			childId: { create: [] },
			parentId: 56,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Calculate TAM',
			isCompleted: true,
			childId: { create: [] },
			parentId: 56,
		},
	},
	{
		data: {
			type: 'board',
			name: 'Marketing Plan',
			childId: {
				create: [
					{ id: 60, order: 0 },
					{ id: 77, order: 1 },
					{ id: 78, order: 2 },
				],
			},
			parentId: 1,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Todo',
			childId: {
				create: [
					{ id: 61, order: 0 },
					{ id: 68, order: 1 },
					{ id: 72, order: 2 },
				],
			},
			parentId: 59,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Plan Product Hunt launch',
			description: '',
			status: 'Todo',
			childId: {
				create: [
					{ id: 62, order: 0 },
					{ id: 63, order: 1 },
					{ id: 64, order: 2 },
					{ id: 65, order: 3 },
					{ id: 66, order: 4 },
					{ id: 67, order: 5 },
				],
			},
			parentId: 60,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Find hunter',
			isCompleted: false,
			childId: { create: [] },
			parentId: 61,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Gather assets',
			isCompleted: false,
			childId: { create: [] },
			parentId: 61,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Draft product page',
			isCompleted: false,
			childId: { create: [] },
			parentId: 61,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Notify customers',
			isCompleted: false,
			childId: { create: [] },
			parentId: 61,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Notify network',
			isCompleted: false,
			childId: { create: [] },
			parentId: 61,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Launch!',
			isCompleted: false,
			childId: { create: [] },
			parentId: 61,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Share on Show HN',
			description: '',
			status: '',
			childId: {
				create: [
					{ id: 69, order: 0 },
					{ id: 70, order: 1 },
					{ id: 71, order: 2 },
				],
			},
			parentId: 60,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Draft out HN post',
			isCompleted: false,
			childId: { create: [] },
			parentId: 68,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Get feedback and refine',
			isCompleted: false,
			childId: { create: [] },
			parentId: 68,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Publish post',
			isCompleted: false,
			childId: { create: [] },
			parentId: 68,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Write launch article to publish on multiple channels',
			description: '',
			status: '',
			childId: {
				create: [
					{ id: 73, order: 0 },
					{ id: 74, order: 1 },
					{ id: 75, order: 2 },
					{ id: 76, order: 3 },
				],
			},
			parentId: 60,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Write article',
			isCompleted: false,
			childId: { create: [] },
			parentId: 72,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Publish on LinkedIn',
			isCompleted: false,
			childId: { create: [] },
			parentId: 72,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Publish on Inndie Hackers',
			isCompleted: false,
			childId: { create: [] },
			parentId: 72,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Publish on Medium',
			isCompleted: false,
			childId: { create: [] },
			parentId: 72,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Doing',
			childId: { create: [] },
			parentId: 59,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Done',
			childId: { create: [] },
			parentId: 59,
		},
	},
	{
		data: {
			type: 'board',
			name: 'Roadmap',
			childId: {
				create: [
					{ id: 80, order: 0 },
					{ id: 88, order: 1 },
					{ id: 89, order: 2 },
				],
			},
			parentId: 1,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Now',
			childId: {
				create: [
					{ id: 81, order: 0 },
					{ id: 84, order: 1 },
				],
			},
			parentId: 79,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Launch version one',
			description: '',
			status: '',
			childId: {
				create: [
					{ id: 82, order: 0 },
					{ id: 83, order: 1 },
				],
			},
			parentId: 80,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Launch privately to our waitlist',
			isCompleted: false,
			childId: { create: [] },
			parentId: 81,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Launch publicly on PH, HN, etc.',
			isCompleted: false,
			childId: { create: [] },
			parentId: 81,
		},
	},
	{
		data: {
			type: 'task',
			title: 'Review early feedback and plan next steps for roadmap',
			description:
				"Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
			status: '',
			childId: {
				create: [
					{ id: 85, order: 0 },
					{ id: 86, order: 1 },
					{ id: 87, order: 2 },
				],
			},
			parentId: 80,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Interview 10 customers',
			isCompleted: false,
			childId: { create: [] },
			parentId: 84,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Review common customer pain points and suggestions',
			isCompleted: false,
			childId: { create: [] },
			parentId: 84,
		},
	},
	{
		data: {
			type: 'subtask',
			title: 'Outline next steps for our roadmap',
			isCompleted: false,
			childId: { create: [] },
			parentId: 84,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Next',
			childId: { create: [] },
			parentId: 79,
		},
	},
	{
		data: {
			type: 'column',
			name: 'Later',
			childId: { create: [] },
			parentId: 79,
		},
	},
];
