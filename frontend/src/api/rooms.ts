import axios from 'axios'
export type RoomsApiResponce =Room[];
   
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
}
//ログインAPI
export const getAll =async():Promise<RoomsApiResponce>=>{
    const result =await axios.get<RoomsApiResponce>('/api/rooms/all');
    
    console.log("Rooms =====================");
    console.log(result);
    return result.data;
}
