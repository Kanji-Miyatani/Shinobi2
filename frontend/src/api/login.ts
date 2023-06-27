import axios from 'axios'
import { getURL } from './URL'
export type LoginApiRequest ={
    email:string , 
    password:string
}

export type LoginApiResponce ={
    result:boolean,
    message:string,
    id:number|null
}
//ログインAPI
const login =async(data:LoginApiRequest):Promise<LoginApiResponce>=>{
    const result =await axios.post<LoginApiResponce>(getURL('/api/login'),data);
    return result.data;
}

export default login;