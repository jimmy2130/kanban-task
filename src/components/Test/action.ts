// 'use server';
// import { revalidateTag } from 'next/cache';
// import prisma from './client';

// export async function create(formData: FormData) {
// 	const email = formData.get('email');
// 	const name = formData.get('name');

// 	if (typeof email !== 'string' || typeof name !== 'string') {
// 		return;
// 	}

// 	await prisma.user.create({
// 		data: {
// 			name,
// 			email,
// 		},
// 	});
// 	revalidateTag('/');
// }

// export async function addData(name: string, email: string) {
// 	await prisma.user.create({
// 		data: {
// 			name,
// 			email,
// 		},
// 	});
// 	revalidateTag('/');
// }

// export async function getData() {
// 	await prisma.user.findMany();
// }
