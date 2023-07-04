"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRepo = __importStar(require("../repository/usersRepository"));
const jwtService_1 = require("../services/jwtService");
const bcrypt = __importStar(require("bcrypt"));
const dateService = __importStar(require("../services/dateService"));
const asyncWrapper_1 = __importDefault(require("../services/asyncWrapper"));
const router = (0, express_1.Router)();
//=======================================
//ログイン処理
//=======================================
router.post("/", (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //ユーザー取得
    const user = yield usersRepo.selectOne(req.body.email);
    if (user === null) {
        res.json({
            result: false,
            id: null,
            message: 'パスワードが違います。'
        });
        return;
    }
    const inputedPass = req.body.password;
    //
    const match = yield bcrypt.compare(inputedPass, user.password);
    if (match) {
        const jwtToken = jwtService_1.jwtHelper.createToken({
            id: user.id,
            name: user.name
        });
        console.log("ログインを検知");
        res.cookie("jwtToken", jwtToken, {
            //webサーバーのみがアクセス可能
            httpOnly: true,
            //cookieの有効期限は2日間に設定
            expires: dateService.getDaysLater(2),
            secure: true,
            sameSite: 'none'
        }).json({
            id: user.id,
            result: true,
            message: "login success"
        });
    }
    else {
        res.json({
            id: null,
            result: false,
            message: "パスワードが違います。"
        });
    }
})));
exports.default = router;
//# sourceMappingURL=login.js.map