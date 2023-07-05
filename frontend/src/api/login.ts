import axios from 'axios'
import { getURL } from './URL'
import { getAxiosSetting } from './axiosSetting'
import { LoginApiRequest, LoginApiResponce } from '../interfaces/apiReqRes';

//ログインAPI
const login =async(data:LoginApiRequest):Promise<LoginApiResponce>=>{
    const result =await axios.post<LoginApiResponce>(getURL('/api/login'),data,getAxiosSetting());
    return result.data;
}

export default login;