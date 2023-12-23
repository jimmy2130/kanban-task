import * as React from 'react';
import BoardPage from '@/components/BoardPage';
import prisma from '@/helpers/prisma';

export default async function Home() {
	const records = await prisma.record.findMany({
		include: { childId: true },
	});

	return <BoardPage records={records} />;
}
