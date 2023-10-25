export const DATA = {
	boards: [
		{
			id: 'b0',
			name: 'Platform Launch',
			columns: [
				{
					id: 'c0',
					name: 'Todo',
					tasks: [
						{
							id: 't0',
							title: 'Build UI for onboarding flow',
							description: '',
							status: 'Todo',
							subtasks: [
								{
									id: 's0',
									title: 'Sign up page',
									isCompleted: true,
								},
								{
									id: 's1',
									title: 'Sign in page',
									isCompleted: false,
								},
								{
									id: 's2',
									title: 'Welcome page',
									isCompleted: false,
								},
							],
						},
						{
							id: 't1',
							title: 'Build UI for search',
							description: '',
							status: 'Todo',
							subtasks: [
								{
									id: 's3',
									title: 'Search page',
									isCompleted: false,
								},
							],
						},
						{
							id: 't2',
							title: 'Build settings UI',
							description: '',
							status: 'Todo',
							subtasks: [
								{
									id: 's4',
									title: 'Account page',
									isCompleted: false,
								},
								{
									id: 's5',
									title: 'Billing page',
									isCompleted: false,
								},
							],
						},
						{
							id: 't3',
							title: 'QA and test all major user journeys',
							description:
								'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
							status: 'Todo',
							subtasks: [
								{
									id: 's6',
									title: 'Internal testing',
									isCompleted: false,
								},
								{
									id: 's7',
									title: 'External testing',
									isCompleted: false,
								},
							],
						},
					],
				},
				{
					id: 'c1',
					name: 'Doing',
					tasks: [
						{
							id: 't201',
							title: 'Design settings and search pages',
							description: '',
							status: 'Doing',
							subtasks: [
								{
									id: 's26',
									title: 'Settings - Account page',
									isCompleted: true,
								},
								{
									id: 's27',
									title: 'Settings - Billing page',
									isCompleted: true,
								},
								{
									id: 's28',
									title: 'Search page',
									isCompleted: false,
								},
							],
						},
						{
							id: 't202',
							title: 'Add account management endpoints',
							description: '',
							status: 'Doing',
							subtasks: [
								{
									id: 's29',
									title: 'Upgrade plan',
									isCompleted: true,
								},
								{
									id: 's30',
									title: 'Cancel plan',
									isCompleted: true,
								},
								{
									id: 's31',
									title: 'Update payment method',
									isCompleted: false,
								},
							],
						},
						{
							id: 't203',
							title: 'Design onboarding flow',
							description: '',
							status: 'Doing',
							subtasks: [
								{
									id: 's31',
									title: 'Sign up page',
									isCompleted: true,
								},
								{
									id: 's32',
									title: 'Sign in page',
									isCompleted: false,
								},
								{
									id: 's33',
									title: 'Welcome page',
									isCompleted: false,
								},
							],
						},
						{
							id: 't204',
							title: 'Add search enpoints',
							description: '',
							status: 'Doing',
							subtasks: [
								{
									id: 's34',
									title: 'Add search endpoint',
									isCompleted: true,
								},
								{
									id: 's35',
									title: 'Define search filters',
									isCompleted: false,
								},
							],
						},
						{
							id: 't205',
							title: 'Add authentication endpoints',
							description: '',
							status: 'Doing',
							subtasks: [
								{
									id: 's36',
									title: 'Define user model',
									isCompleted: true,
								},
								{
									id: 's37',
									title: 'Add auth endpoints',
									isCompleted: false,
								},
							],
						},
						{
							id: 't206',
							title:
								'Research pricing points of various competitors and trial different business models',
							description:
								"We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
							status: 'Doing',
							subtasks: [
								{
									id: 's38',
									title: 'Research competitor pricing and business models',
									isCompleted: true,
								},
								{
									id: 's39',
									title: 'Outline a business model that works for our solution',
									isCompleted: false,
								},
								{
									id: 's40',
									title:
										'Talk to potential customers about our proposed solution and ask for fair price expectancy',
									isCompleted: false,
								},
							],
						},
					],
				},
				{
					id: 'c2',
					name: 'Done',
					tasks: [
						{
							id: 't101',
							title: 'Conduct 5 wireframe tests',
							description:
								'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
							status: 'Done',
							subtasks: [
								{
									id: 's41',
									title: 'Complete 5 wireframe prototype tests',
									isCompleted: true,
								},
							],
						},
						{
							id: 't102',
							title: 'Create wireframe prototype',
							description:
								'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
							status: 'Done',
							subtasks: [
								{
									id: 's42',
									title: 'Create clickable wireframe prototype in Balsamiq',
									isCompleted: true,
								},
							],
						},
						{
							id: 't103',
							title: 'Review results of usability tests and iterate',
							description:
								"Keep iterating through the subtasks until we're clear on the core concepts for the app.",
							status: 'Done',
							subtasks: [
								{
									id: 's43',
									title:
										'Meet to review notes from previous tests and plan changes',
									isCompleted: true,
								},
								{
									id: 's44',
									title: 'Make changes to paper prototypes',
									isCompleted: true,
								},
								{
									id: 's45',
									title: 'Conduct 5 usability tests',
									isCompleted: true,
								},
							],
						},
						{
							id: 't104',
							title:
								'Create paper prototypes and conduct 10 usability tests with potential customers',
							description: '',
							status: 'Done',
							subtasks: [
								{
									id: 's46',
									title: 'Create paper prototypes for version one',
									isCompleted: true,
								},
								{
									id: 's47',
									title: 'Complete 10 usability tests',
									isCompleted: true,
								},
							],
						},
						{
							id: 't105',
							title: 'Market discovery',
							description:
								'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
							status: 'Done',
							subtasks: [
								{
									id: 's48',
									title: 'Interview 10 prospective customers',
									isCompleted: true,
								},
							],
						},
						{
							id: 't106',
							title: 'Competitor analysis',
							description: '',
							status: 'Done',
							subtasks: [
								{
									id: 's49',
									title: 'Find direct and indirect competitors',
									isCompleted: true,
								},
								{
									id: 's50',
									title: 'SWOT analysis for each competitor',
									isCompleted: true,
								},
							],
						},
						{
							id: 't107',
							title: 'Research the market',
							description:
								'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
							status: 'Done',
							subtasks: [
								{
									id: 's51',
									title: 'Write up research analysis',
									isCompleted: true,
								},
								{
									id: 's52',
									title: 'Calculate TAM',
									isCompleted: true,
								},
							],
						},
					],
				},
			],
		},
		{
			id: 'b1',
			name: 'Marketing Plan',
			columns: [
				{
					id: 'c3',
					name: 'Todo',
					tasks: [
						{
							id: 't4',
							title: 'Plan Product Hunt launch',
							description: '',
							status: 'Todo',
							subtasks: [
								{
									id: 's8',
									title: 'Find hunter',
									isCompleted: false,
								},
								{
									id: 's9',
									title: 'Gather assets',
									isCompleted: false,
								},
								{
									id: 's10',
									title: 'Draft product page',
									isCompleted: false,
								},
								{
									id: 's11',
									title: 'Notify customers',
									isCompleted: false,
								},
								{
									id: 's12',
									title: 'Notify network',
									isCompleted: false,
								},
								{
									id: 's13',
									title: 'Launch!',
									isCompleted: false,
								},
							],
						},
						{
							id: 't5',
							title: 'Share on Show HN',
							description: '',
							status: '',
							subtasks: [
								{
									id: 's14',
									title: 'Draft out HN post',
									isCompleted: false,
								},
								{
									id: 's15',
									title: 'Get feedback and refine',
									isCompleted: false,
								},
								{
									id: 's16',
									title: 'Publish post',
									isCompleted: false,
								},
							],
						},
						{
							id: 't6',
							title: 'Write launch article to publish on multiple channels',
							description: '',
							status: '',
							subtasks: [
								{
									id: 's17',
									title: 'Write article',
									isCompleted: false,
								},
								{
									id: 's18',
									title: 'Publish on LinkedIn',
									isCompleted: false,
								},
								{
									id: 's19',
									title: 'Publish on Inndie Hackers',
									isCompleted: false,
								},
								{
									id: 's20',
									title: 'Publish on Medium',
									isCompleted: false,
								},
							],
						},
					],
				},
				{
					id: 'c4',
					name: 'Doing',
					tasks: [],
				},
				{
					id: 'c5',
					name: 'Done',
					tasks: [],
				},
			],
		},
		{
			id: 'b2',
			name: 'Roadmap',
			columns: [
				{
					id: 'c6',
					name: 'Now',
					tasks: [
						{
							id: 't7',
							title: 'Launch version one',
							description: '',
							status: '',
							subtasks: [
								{
									id: 's21',
									title: 'Launch privately to our waitlist',
									isCompleted: false,
								},
								{
									id: 's22',
									title: 'Launch publicly on PH, HN, etc.',
									isCompleted: false,
								},
							],
						},
						{
							id: 't8',
							title: 'Review early feedback and plan next steps for roadmap',
							description:
								"Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
							status: '',
							subtasks: [
								{
									id: 's23',
									title: 'Interview 10 customers',
									isCompleted: false,
								},
								{
									id: 's24',
									title: 'Review common customer pain points and suggestions',
									isCompleted: false,
								},
								{
									id: 's25',
									title: 'Outline next steps for our roadmap',
									isCompleted: false,
								},
							],
						},
					],
				},
				{
					id: 'c7',
					name: 'Next',
					tasks: [],
				},
				{
					id: 'c8',
					name: 'Later',
					tasks: [],
				},
			],
		},
	],
};
