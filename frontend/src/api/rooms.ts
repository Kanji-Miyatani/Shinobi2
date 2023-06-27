import axios from 'axios'
import { Chat } from './chat';
import { getURL } from './URL';
export type RoomsApiResponce =Room[];
export type RoomFetchApiResponce =Room;
export type Room ={
    id: string
    name: string
    /**
     * ユーザーによる作成かどうか
     */
    isUserCreated: boolean
    /**
     * 使用可能なRoomかどうか
     */
    isActive: boolean
    /**
     * 最大人数
     */
    maximum: number
    createdAt: Date

    chats:Chat[]
    users:User[]
}


export type User = {
     /**
   * id
   */
  id: number
    /**
   * 名前
   */
  name: string
  /**
   * ユーザーのログイン権限
   */
  level: string
  /**
   * 選択キャラクター
   */
  characterId: string
}
//部屋取得API
export const getAll =async():Promise<RoomsApiResponce>=>{
    const result =await axios.get<RoomsApiResponce>(getURL('/api/rooms/all'), {
        withCredentials: true,
      });
    
    return result.data;
}

//入室部屋情報取得API
export const getOne =async(id:string):Promise<RoomFetchApiResponce>=>{
    const result =await axios.get<RoomFetchApiResponce>(getURL(`/api/rooms/fetch?id=${id}`), {
        withCredentials: true,
      });
    return result.data;
}

