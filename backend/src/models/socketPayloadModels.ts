export type MessageToSend ={
    createdAt:Date
    message:string
    user:{
        id:number
        name:string
        characterId:string
    }
}