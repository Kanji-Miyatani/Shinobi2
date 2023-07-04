"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const https_1 = __importDefault(require("https"));
const socket_io_1 = require("socket.io");
const index_1 = __importDefault(require("./router/index"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chatService_1 = __importDefault(require("./services/chatService"));
const dbInitializer_1 = require("./services/dbInitializer");
const app = (0, express_1.default)();
const PORT = 3001;
//自己SSL証明書を設定
const server = https_1.default.createServer({
    key: fs_1.default.readFileSync('./cert/privatekey.pem'),
    cert: fs_1.default.readFileSync('./cert/cert.pem'),
}, app);
(0, dbInitializer_1.initializeDB)().then(() => console.log('DB初期化完了'));
//リクエストされたjsonを読み取れるようにする
app.use(express_1.default.json());
//cors設定(websocketに対してproxが設定出来ないため)
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
}));
//リクエストされたcookieを読み取れるようにする
app.use((0, cookie_parser_1.default)());
//APIルーティング
app.use(express_1.default.static(path_1.default.join(__dirname, './www/')));
console.log(__dirname);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve('./dist/www/index.html'));
});
app.use(index_1.default);
//チャット
const io = new socket_io_1.Server(server, {
    cookie: true
});
(0, chatService_1.default)(io);
server.listen(PORT, () => {
    console.log(`ポート：${PORT}でサーバー起動！`);
});
//# sourceMappingURL=index.js.map