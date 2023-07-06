import axios from 'axios';
import { getURL } from './URL';
import { getAxiosSetting } from './axiosSetting';
import { RoomFetchApiResponce, RoomsApiResponce } from '../interfaces/apiReqRes';


//部屋取得API
export const getAll =async():Promise<RoomsApiResponce>=>{
    const result =await axios.get<RoomsApiResponce>(getURL('/api/rooms/all'),getAxiosSetting());
    return result.data;
}

//入室部屋情報取得API
export const getOne =async(id:string):Promise<RoomFetchApiResponce>=>{
    const result =await axios.get<RoomFetchApiResponce>(getURL(`/api/rooms/fetch?id=${id}`),getAxiosSetting());
    result.data.chats.map((chat)=>{chat.createdAt=new Date(chat.createdAt)});
    return result.data;
}

