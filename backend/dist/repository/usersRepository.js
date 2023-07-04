"use strict";
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
exports.updateRoom = exports.create = exports.selectIdFromSocketId = exports.selectOneByID = exports.selectOne = exports.selectInRoom = exports.selectAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const selectAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany({});
    return allUsers;
});
exports.selectAll = selectAll;
//任意の部屋に入室中のユーザーをすべて取得
const selectInRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany({
        where: {
            roomId: roomId,
        }
    });
    return allUsers;
});
exports.selectInRoom = selectInRoom;
const selectOne = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            mailaddress: email,
        }
    });
    return user;
});
exports.selectOne = selectOne;
const selectOneByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            id: id,
        }
    });
    return user;
});
exports.selectOneByID = selectOneByID;
const selectIdFromSocketId = (socketId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            socketId: socketId,
        },
        select: {
            id: true
        }
    });
    if (user === null) {
        return 0;
    }
    return user.id;
});
exports.selectIdFromSocketId = selectIdFromSocketId;
const create = (name, email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.create({
        data: {
            name: name,
            password: pass,
            created_at: new Date(),
            mailaddress: email,
            characterId: "shinobi" //デフォルトキャラ
        }
    });
});
exports.create = create;
// 部屋更新
const updateRoom = (userId, roomId, socketId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.update({
        where: {
            id: userId
        },
        data: {
            roomId: roomId,
            socketId: socketId
        }
    });
});
exports.updateRoom = updateRoom;
//# sourceMappingURL=usersRepository.js.map