import { Chat ,PrismaClient} from "@prisma/client";
import { MessageToSend } from "../models/socketPayloadModels";
const prisma = new PrismaClient();
export const create=async (roomId :string,chat:MessageToSend)=>{
    await prisma.chat.create({
        data:{
            message:chat.message,
            createdAt:chat.createdAt,
            user:{ connect: { id: chat.userId } } ,
            room:{connect:{id:roomId}}
        }
    });
}