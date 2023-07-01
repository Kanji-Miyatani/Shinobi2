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
    //ローカルストレージにセッション保存
    const jwtToken = result.headers['set-cookie'];
    return result.data;
}

export default login;