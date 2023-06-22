import  {User,PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export const selectAll=async () : Promise<User[]>=>{
    const allUsers = await prisma.user.findMany({
    })
    return allUsers;
}

export const selectOne=async (email : string | undefined) : Promise<User | null>=>{
    const user = await prisma.user.findFirst({
        where:{
            mailaddress : email,
        }
    })
    return user;
}
export const selectIdFromSocketId=async (socketId:string) : Promise<number>=>{
    const user = await prisma.user.findFirst({
        where:{
            socketId : socketId, 
        },
        select:{
            id:true
        }
    })
    if(user===null){
       return 0;
    }
    return user.id;
}

export const create=async (
    name:string,
    email:string,
    pass:string,
    )=>{
    await prisma.user.create({
        data: {
            name:name,
            password:pass,
            created_at:new Date(),
            mailaddress:email,
            characterId:"shinobi"//デフォルトキャラ
        }
        
    })
}
// 部屋更新
export const updateRoom=async (userId:number,roomId:string |null,socketId:string)=>{
    await prisma.user.update({
        where:{
            id : userId
        },
        data:{
            roomId : roomId,
            socketId :socketId
        }
      });
}
