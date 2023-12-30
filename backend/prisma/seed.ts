import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
    await prisma.user.upsert({
        where: { userId: 13 },
        update: {},
        create: {
            email: 'torans@overlook.net',
            passwordHash: '236691104fcefaed2d0bff3998ebba036dc3750f11739f605aeb5251651970d3',
        }
    })
    await prisma.category.upsert({
        where: { categoryId: 1 },
        update: {},
        create: {
            name: 'Пицца',
            description: 'Вкусная пицца, вкусная пицца',
            offers: {
                create: [
                    {
                        title: 'Pepperoni',
                        userId: 13,
                        price: 200,
                        description: 'Очень вкусная пицца',
                    },
                ]
            },
        }
    });
    await prisma.category.upsert({
        where: { categoryId: 2 },
        update: {},
        create: {
            name: 'Паста',
            description: 'Вкусная паста',
            offers: {
                create: [
                    {
                        title: 'Альфредо',
                        userId: 13,
                        price: 200,
                        description: 'Паста Альфредо',
                    },
                    {
                        title: 'Карбонара',
                        userId: 13,
                        price: 300,
                        description: 'Паста Карбонара',
                    }
                ]
            }
        }
    });
    await prisma.category.upsert({
        where: { categoryId: 3 },
        update: {},
        create: {
            name: 'Бургеры',
            description: 'Вкусные бургеры',
            offers: {
                create: [
                    {
                        title: 'Бургер',
                        userId: 13,
                        price: 600,
                        description: 'Вкусный бургер',
                    },
                ]
            }
        }
    })
    console.info('🤘️ Database was filled')
}

fillDb()
    .then(async () => {
        await prisma.$disconnect()
        const categories = await prisma.category.findMany()
        console.log(categories)
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect()

        process.exit(1);
    })
