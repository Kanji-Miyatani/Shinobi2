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
exports.getCanEnter = exports.create = exports.selectOne = exports.selectAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const selectAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRooms = yield prisma.room.findMany({
        include: {
            users: {
                select: {
                    _count: true
                }
            }
        }
    });
    return allRooms;
});
exports.selectAll = selectAll;
const selectOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prisma.room.findFirst({
        where: {
            id: id,
        },
        include: {
            chats: true,
            users: true
        }
    });
    return room;
});
exports.selectOne = selectOne;
const create = (room) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.room.create({
        data: room,
    });
});
exports.create = create;
//チャット部屋に入室可能かどうかを取得
const getCanEnter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.room.findFirst({
        where: {
            id: id
        },
        select: {
            _count: {
                select: { users: true },
            },
            maximum: true
        }
    });
    if (result) {
        return (result === null || result === void 0 ? void 0 : result._count.users) < (result === null || result === void 0 ? void 0 : result.maximum);
    }
    return false;
});
exports.getCanEnter = getCanEnter;
//# sourceMappingURL=roomsRepository.js.map