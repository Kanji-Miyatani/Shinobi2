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
    if((await characterRepo.selectAll()).length>=2){
        return;
    }
    const characters : Array<Character> = [
        {
            id : "shinobi",
            imgCode : "shinobi",
            name:"シノビ"
        },
        {
            id : "unset",
            imgCode : "unset",
            name:""
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
  
    if((await usersRepo.selectAll()).length===0){
        await usersRepo.create("yakan","admin",hashed);
    }
    if((await usersRepo.selectAll()).length===1){
        await usersRepo.create("ちんかす男","katsuya",hashed);
    }
    if((await usersRepo.selectAll()).length===3){
        await usersRepo.create("APEX世界一位","toru",hashed);
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
        {
            id : "univ-hyougo",
            name:"兵庫県立大学",
            createdAt:new Date(),
            isActive :true,
            isUserCreated:false,
            maximum:15
        },
        {
            id : "tokyo-sinjuku",
            name:"新宿東京",
            createdAt:new Date(),
            isActive :true,
            isUserCreated:false,
            maximum:10
        },
    ] ;
    const roomsRegisted = await roomsRepo.selectAll()
    rooms.map(async (data)=>{
        if(roomsRegisted.filter(x=>x.id===data.id).length===0)
        {
            await roomsRepo.create(data);
        }
    }) 
    
}