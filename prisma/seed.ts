import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: '$2b$10$V8BDW.7.FLi/eZyW1JoMLe2mwRCDx1ts6k.cUHRi/IDdvnRWpkrgS', // sufanxp (salt = 10)
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
