import jwt from "jsonwebtoken";
//トークン認証結果とデコード結果
export interface JwtVertfiedResult{
  result:Boolean //認証エラーの場合false
  decorded:MyJwtPayload | null
}
//JWTのペイロード
export interface MyJwtPayload{
  id:number
  name:string
}
export class jwtHelper {
　//秘密鍵
  static jweSecret = "tR8MRZ5Lnswv";
  //トークン生成
  static createToken(payload:MyJwtPayload) {
    const token = jwt.sign(payload, this.jweSecret, {
      expiresIn: "30d",
    });
    return token;
  }
  //トークン認証
  static verifyToken(token: string):JwtVertfiedResult {
    try {
      const decorded = jwt.verify(token, this.jweSecret);
      return {
        result : true,
        decorded:( decorded as MyJwtPayload)
      };
    } catch (err) {
      console.log(err);
      return {
        result : false,
        decorded:null
      };
    }
  }
}