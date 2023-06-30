export const getURL =(path:string):string=>{
    const baseURL = process.env.APIURL ?? "http://localhost:3000";
    return `${baseURL}${path}`;
}