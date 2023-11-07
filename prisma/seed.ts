// https://sqlite.org/forum/info/a42ca36f0eea96c1

import { PrismaClient } from '@prisma/client';
import { DATA } from './seed-data';
const prisma = new PrismaClient();

async function main() {
	await prisma.record.deleteMany();
	await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = -1 WHERE name = "Record"`;
	for (let i = 0; i < DATA.length; i++) {
		await prisma.record.create(DATA[i]);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
