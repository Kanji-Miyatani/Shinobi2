//X日後の日付を求める
export const getDaysLater = (days : number)=>{
    const today = new Date();
    let result = new Date();
    result.setDate(today.getDate() + days);
    return result;
}