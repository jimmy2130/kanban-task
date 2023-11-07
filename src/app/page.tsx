import * as React from 'react';
import { revalidatePath } from 'next/cache';
import BoardPage from '@/components/BoardPage';
import prisma from '@/helpers/prisma';

async function revalidate(path: string) {
	'use server';
	revalidatePath(path);
}

export default async function Home() {
	const records = await prisma.record.findMany({
		include: { childId: true },
	});
	records.forEach(r => {
		r.childId.sort((a, b) => a.order - b.order);
	});
	return <BoardPage records={records} revalidate={revalidate} />;
}
