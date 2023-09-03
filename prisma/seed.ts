import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: '$2y$10$bGCs6SMtui1Vu7.Ii5Qm8.p069FOuaoBQLpQszqBDYjhdF/u8EMke', // sufanxp (salt = 10)
      role: 'SU_ADMIN',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
