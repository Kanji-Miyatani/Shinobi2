import { Chat ,PrismaClient} from "@prisma/client";
import { MessageToSend } from "../models/socketPayloadModels";
const prisma = new PrismaClient();
export const create=async (roomId :string,chat:MessageToSend)=>{
    await prisma.chat.create({
        data:{
            message:chat.message,
            createdAt:chat.createdAt,
            user:{ connect: { id: chat.user.id } } ,
            room:{connect:{id:roomId}}
        }
    });
}

export const selectOnRoom=async (roomId :string):Promise<MessageToSend[]>=>{
    const data= await prisma.chat.findMany({
        orderBy:{
            createdAt:"desc"
        },
        take: 40,
        where:{
            roomId : roomId, 
        },
        include:{
            user:true
        }
    });
    return data.map((chat):MessageToSend=>{
        return{
            createdAt: chat.createdAt,
            message: chat.message,
            user: {
                id: chat.userId,
                name: chat.user?.name ?? "",
                characterId:chat.user?.characterId ?? "shinobi"
            }
        }
    })
}