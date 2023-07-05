//チャット
export type Chat = {
    id: number
    message: string
    createdAt: Date
    userId: number
    roomId: string
    user:User
}
//部屋
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

//ユーザー
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