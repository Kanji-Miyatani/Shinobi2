"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorize_1 = __importDefault(require("./authorize"));
const login_1 = __importDefault(require("./login"));
const room_1 = __importDefault(require("./room"));
const signUp_1 = __importDefault(require("./signUp"));
const router = express_1.default.Router();
router.use('/api/auth', authorize_1.default);
router.use('/api/login', login_1.default);
router.use('/api/rooms', room_1.default);
router.use('/api/signUp', signUp_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map