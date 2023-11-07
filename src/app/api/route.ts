// https://www.youtube.com/watch?v=xirQ7AMyTM8
import prisma from '@/helpers/prisma';
import { type SwapRequest } from '@/constants';

// export async function GET() {
// 	const record = await prisma.record.findMany({ include: { childId: true } });
// 	return Response.json(record);
// }

export async function POST(request: Request) {
	const { taskId, oldColumnId, newColumnId, targetPosition }: SwapRequest =
		await request.json();

	const { order: originalPosition } = await prisma.child.findUniqueOrThrow({
		where: { id: taskId },
	});

	if (oldColumnId === newColumnId && originalPosition === targetPosition) {
		return Response.json('success');
	}

	if (oldColumnId !== newColumnId) {
		await prisma.record.update({
			where: { id: taskId },
			data: { parentId: newColumnId },
		});
		const newChildren = await prisma.child.findMany({
			where: {
				recordId: newColumnId,
			},
		});
		const targetChildren = newChildren.filter(
			({ order }) => order >= targetPosition,
		);

		for (let i = 0; i < targetChildren.length; i++) {
			await prisma.child.update({
				where: { id: targetChildren[i]['id'] },
				data: { order: targetChildren[i]['order'] + 1 },
			});
		}

		await prisma.child.update({
			where: { id: taskId },
			data: { order: targetPosition, recordId: newColumnId },
		});

		const oldChildren = await prisma.child.findMany({
			where: {
				recordId: oldColumnId,
			},
		});
		const originalChildren = oldChildren.filter(
			({ order }) => order > originalPosition,
		);
		for (let i = 0; i < originalChildren.length; i++) {
			await prisma.child.update({
				where: { id: originalChildren[i]['id'] },
				data: { order: originalChildren[i]['order'] - 1 },
			});
		}
	} else if (oldColumnId === newColumnId) {
		const children = await prisma.child.findMany({
			where: {
				recordId: newColumnId,
			},
		});
		if (originalPosition < targetPosition) {
			const target = children.filter(
				({ order }) => order > originalPosition && order <= targetPosition,
			);
			for (let i = 0; i < target.length; i++) {
				await prisma.child.update({
					where: { id: target[i]['id'] },
					data: { order: target[i]['order'] - 1 },
				});
			}
		} else if (originalPosition > targetPosition) {
			const target = children.filter(
				({ order }) => order >= targetPosition && order < originalPosition,
			);
			for (let i = 0; i < target.length; i++) {
				await prisma.child.update({
					where: { id: target[i]['id'] },
					data: { order: target[i]['order'] + 1 },
				});
			}
		}
		await prisma.child.update({
			where: { id: taskId },
			data: { order: targetPosition },
		});
	}
	return Response.json('success');
}
