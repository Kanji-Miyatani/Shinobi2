"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class jwtHelper {
    //トークン生成
    static createToken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, this.jweSecret, {
            expiresIn: "30d",
        });
        return token;
    }
    //トークン認証
    static verifyToken(token) {
        try {
            const decorded = jsonwebtoken_1.default.verify(token, this.jweSecret);
            return {
                result: true,
                decorded: decorded
            };
        }
        catch (err) {
            console.log(err);
            return {
                result: false,
                decorded: null
            };
        }
    }
}
//秘密鍵
jwtHelper.jweSecret = "tR8MRZ5Lnswv";
exports.jwtHelper = jwtHelper;
//# sourceMappingURL=jwtService.js.map