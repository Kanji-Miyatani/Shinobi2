import axios from 'axios'
export type AuthApiResponce ={
    result:boolean
}
//ログインAPI
const auth =async():Promise<AuthApiResponce>=>{
    const result =await axios.get<AuthApiResponce>('/api/auth',{
        withCredentials:true,
        
    });
    return result.data;
}

export default auth;