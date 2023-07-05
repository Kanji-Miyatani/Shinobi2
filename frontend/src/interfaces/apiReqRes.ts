import { Chat, Room } from "./models";

//ログイン(リクエスト)
export type LoginApiRequest ={
    email:string , 
    password:string
}
//ログイン(レスポンス)
export type LoginApiResponce ={
    result:boolean,
    message:string,
    id:number|null
}
//部屋すべて取得(レスポンス)
export type RoomsApiResponce =Room[];
//部屋詳細取得(レスポンス)
export type RoomFetchApiResponce ={
    room:Room,
    chats:Chat[]
};