import {Room,PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
export const selectAll=async () : Promise<Room[]>=>{
    const allRooms = await prisma.room.findMany({
        include:{
            users:{
                select:{
                    _count:true
                }
            }
        }
    })
    return allRooms;
}

export const selectOne=async (id :string | undefined) : Promise<Room | null>=>{
    const room = await prisma.room.findFirst({
        where:{
            id : id, 
        },
        include:{
            users:true
        }
    });
    return room;
}

export  const create=async (room:Room)=>{
    await prisma.room.create({
        data: room,
      })
}

//チャット部屋に入室可能かどうかを取得
export const getCanEnter=async (id :string | undefined) : Promise<boolean>=>{
    const result = await prisma.room.findFirst({
        where:{
            id : id
        },
        select: {
            _count: {
                select: { users: true },
            },
            maximum:true
        }
    });
    if(result){
        return (result?._count.users as number )< (result?.maximum as number);
    }
    return false;
}

