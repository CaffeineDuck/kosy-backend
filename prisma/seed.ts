// import { PrismaClient, User } from '@prisma/client';

// const prisma = new PrismaClient();

// const users: User[] = [
//   {
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     email: 'samrid.pandit@gmail.com',
//     username: 'samrid',
//     id: 1,
//     name: 'samrid pandit',
//     password: 'noeu',
//     role: 'ADMIN',
    
//   },
// ];

// const addUsers = async () => {
//   users.forEach(async (user) => {
//     try {
//       await prisma.user.create({
//         data: user,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   });
// };

// addUsers()
//   .catch((e) => console.log(e))
//   .finally(() => prisma.$disconnect());
