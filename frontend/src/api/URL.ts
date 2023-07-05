export const getURL =(path:string):string=>{
    console.log(process.env.APIURL)
    const baseURL = process.env.APIURL ?? "https://localhost:3001";
    if(baseURL==='/')return path;
    return `${baseURL}${path}`;
}