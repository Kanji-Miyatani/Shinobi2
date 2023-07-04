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
exports.initializeDB = void 0;
const usersRepo = __importStar(require("../repository/usersRepository"));
const characterRepo = __importStar(require("../repository/charactersRepository"));
const roomsRepo = __importStar(require("../repository/roomsRepository"));
const bcrypt = __importStar(require("bcrypt"));
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createCharacters();
    yield createUser();
    yield createRooms();
});
exports.initializeDB = initializeDB;
/**
 * 初期キャラ作成
 */
const createCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield characterRepo.selectAll()).length !== 0) {
        return;
    }
    const characters = [
        {
            id: "shinobi",
            imgCode: "shinobi",
            name: "シノビ"
        },
    ];
    characters.map((character) => __awaiter(void 0, void 0, void 0, function* () {
        yield characterRepo.create(character);
    }));
});
/**
 * 管理ユーザー作成
 */
const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt.hash("adminadmin", 10);
    console.log("ハッシュ値＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝");
    console.log(hashed);
    console.log("ハッシュ値＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝");
    if ((yield usersRepo.selectAll()).length === 0) {
        yield usersRepo.create("yakan", "admin", hashed);
    }
    if ((yield usersRepo.selectAll()).length === 1) {
        yield usersRepo.create("ちんかす男", "katsuya", hashed);
    }
});
/**
 * 管理ユーザー作成
 */
const createRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = [
        {
            id: "shinobi",
            name: "集会所",
            createdAt: new Date(),
            isActive: true,
            isUserCreated: false,
            maximum: 10
        },
    ];
    if ((yield roomsRepo.selectAll()).length === 0) {
        rooms.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            yield roomsRepo.create(data);
        }));
    }
});
//# sourceMappingURL=dbInitializer.js.map