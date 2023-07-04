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
exports.create = exports.selectOne = exports.selectAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const selectAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCharacters = yield prisma.character.findMany({});
    return allCharacters;
});
exports.selectAll = selectAll;
const selectOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const character = yield prisma.character.findFirst({
        where: {
            id: id,
        }
    });
    return character;
});
exports.selectOne = selectOne;
const create = (character) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.character.create({
        data: character,
    });
});
exports.create = create;
//# sourceMappingURL=charactersRepository.js.map