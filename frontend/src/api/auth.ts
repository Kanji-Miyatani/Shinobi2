import axios from 'axios'
import { getAxiosSetting } from './axiosSetting';
export type AuthApiResponce ={
    result:boolean
}
//ログインAPI
const auth =async():Promise<AuthApiResponce>=>{
    const result =await axios.get<AuthApiResponce>('/api/auth');
    return result.data;
}

export default auth;