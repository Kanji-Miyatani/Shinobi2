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
Object.defineProperty(exports, "__esModule", { value: true });
const jwtService_1 = require("../services/jwtService");
const cookie_1 = require("cookie");
const roomRepo = __importStar(require("../repository/roomsRepository"));
const usersRepo = __importStar(require("../repository/usersRepository"));
const chatRepo = __importStar(require("../repository/chatRepository"));
const socketListen = (io) => {
    //認証ミドルウェア(常にjwtを監視する)
    io.use((socket, next) => {
        if (!socket.handshake.headers.cookie) {
            next(new Error('AUTH_FAILED'));
            return;
        }
        const token = (0, cookie_1.parse)(socket.handshake.headers.cookie);
        const resultObj = jwtService_1.jwtHelper.verifyToken(token["jwtToken"]);
        if (!resultObj.result) {
            next(new Error('AUTH_FAILED'));
        }
        next();
    });
    //接続イベント
    io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("===========Connected！=============");
        if (!socket.handshake.headers.cookie) {
            return;
        }
        const token = (0, cookie_1.parse)(socket.handshake.headers.cookie);
        const claim = jwtService_1.jwtHelper.verifyToken(token["jwtToken"]).decorded;
        //入室可能かを取得
        if (claim === null) {
            console.log("Claim Not Set");
            return;
        }
        //================================
        //入室時
        //================================
        socket.on('join room', (payload, callback) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("===========入室処理=============");
            try {
                const selectedRoomId = payload.roomId;
                //入室可能かを取得
                if (!(yield roomRepo.getCanEnter(selectedRoomId))) {
                    throw new Error("CANNOT_ENTRY");
                }
                console.log(`roomId:${selectedRoomId},userId:${claim.id}`);
                yield usersRepo.updateRoom(claim.id, selectedRoomId, socket.id);
                socket.join(selectedRoomId);
                //入室時初回データを送信
                io.to(selectedRoomId).emit("join room", yield usersRepo.selectInRoom(selectedRoomId));
                //処理完了を通知
                callback({
                    status: "ok"
                });
            }
            catch (e) {
                console.log(e);
            }
        }));
        //================================
        //チャット送信時
        //================================
        socket.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
            //socketのroomsから現在入室している部屋を取得
            console.log("===========送信時処理=============");
            try {
                //送信者データ取得
                const sender = yield usersRepo.selectOneByID(claim.id);
                if (sender === null || sender.roomId === null)
                    throw new Error("Sender Not Found");
                //データ保存
                const chatEmittiing = {
                    createdAt: new Date(),
                    message: message,
                    userId: claim.id
                };
                yield chatRepo.create(sender.roomId, chatEmittiing);
                console.log({
                    sender: sender,
                    message: message,
                    date: new Date()
                });
                io.to(sender.roomId).emit("message", chatEmittiing);
            }
            catch (e) {
                console.log(e);
            }
        }));
        //================================
        //退室時
        //================================
        socket.on('disconnect', (_, next) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("===========退室処理=============");
            yield usersRepo.updateRoom(claim.id, null, null);
            socket.disconnect();
        }));
    }));
};
exports.default = socketListen;
//# sourceMappingURL=chatService.js.map