export const getURL =(path:string):string=>{
    console.log(process.env.REACT_APP_APIURL)
    const baseURL = process.env.REACT_APP_APIURL ?? "https://localhost:3001";
    if(baseURL==='/')return path;
    return `${baseURL}${path}`;
}