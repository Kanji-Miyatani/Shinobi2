export const getURL =(path:string):string=>{
    const baseURL = process.env.APIURL ?? "http://localhost:3001";
    return `${baseURL}${path}`;
}