import * as usersRepo from '../repository/usersRepository'
import * as characterRepo from '../repository/charactersRepository'
import * as roomsRepo from '../repository/roomsRepository'
import { Character,Room } from '@prisma/client';
import * as bcrypt from 'bcrypt';
export const initializeDB = async ()=>{
    await createCharacters();
    await createUser();
    await createRooms();
}
/**
 * 初期キャラ作成
 */
const createCharacters =async()=>{
    if((await characterRepo.selectAll()).length!==0){
        return;
    }
    const characters : Array<Character> = [
        {
            id : "shinobi",
            imgCode : "shinobi",
            name:"シノビ"
        },
    ] ;
    characters.map(async (character)=>{
        await characterRepo.create(character);
    })
}
/**
 * 管理ユーザー作成
 */
const createUser =async()=>{
    const hashed =await bcrypt.hash("adminadmin",10);
    console.log("ハッシュ値＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝")
    console.log(hashed);
    console.log("ハッシュ値＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝")
    if((await usersRepo.selectAll()).length===0){
        await usersRepo.create("yakan","admin",hashed);
    }
}

/**
 * 管理ユーザー作成
 */
const createRooms =async()=>{
    const rooms : Array<Room> = [
        {
            id : "shinobi",
            name:"集会所",
            createdAt:new Date(),
            isActive :true,
            isUserCreated:false,
            maximum:10
        },
    ] ;
    if((await roomsRepo.selectAll()).length===0){
       rooms.map(async (data)=>{
         await roomsRepo.create(data);
       }) 
    }
}