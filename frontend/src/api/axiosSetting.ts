import { AxiosRequestConfig } from "axios";

export const getAxiosSetting =():AxiosRequestConfig<any>=>{
    const getToken =()=>localStorage.getItem('auth');
    return {
        withCredentials:true,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    }
}