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
exports.create = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (roomId, chat) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.chat.create({
        data: {
            message: chat.message,
            createdAt: chat.createdAt,
            user: { connect: { id: chat.userId } },
            room: { connect: { id: roomId } }
        }
    });
});
exports.create = create;
//# sourceMappingURL=chatRepository.js.map