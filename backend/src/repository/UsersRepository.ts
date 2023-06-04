import {User,PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
export const selectAll=async () : Promise<User[]>=>{
    const allUsers = await prisma.user.findMany({
    })
    return allUsers;
}

export const selectOne=async (id : Number) : Promise<User[]>=>{
    const allUsers = await prisma.user.findMany({
    })
    return allUsers;
}

export  const create=async (user:User)=>{
    await prisma.user.create({
        data: user,
      })
}
