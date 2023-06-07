import axios from 'axios'
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
    const result =await axios.post<LoginApiResponce>('/api/login',data);
    return result.data;
}

export default login;