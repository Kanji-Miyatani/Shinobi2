import { User } from "@prisma/client"

export type MessageToSend ={
    createdAt:Date
    message:string
    user:{
        id:number
        name:string
    }
}