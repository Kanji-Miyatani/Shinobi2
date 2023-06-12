import * as usersRepo from '../repository/usersRepository'

export const initializeDB = async ()=>{
    if((await usersRepo.selectAll()).length===0){
        usersRepo.create("yakan","admin","adminadmin");
    }
}