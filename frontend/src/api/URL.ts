export const getURL =(path:string):string=>{
    const baseURL = process.env.APIURL ?? "https://localhost:3001";
    return `${baseURL}${path}`;
}