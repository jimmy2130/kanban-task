import * as React from 'react';
import prisma from '@/components/Test/client';
import Client from './Client';
import { revalidatePath } from 'next/cache';

async function revalidate(path: string) {
	'use server';
	revalidatePath(path);
}

async function Test2() {
	const data = await prisma.user.findMany();

	return (
		<>
			<ul>
				{data.map(
					({
						id,
						email,
						name,
					}: {
						id: number;
						email: string;
						name: string;
					}) => (
						<li key={id}>
							{name}-{email}
						</li>
					),
				)}
			</ul>
			<Client revalidate={revalidate} />
		</>
	);
}

export default Test2;
