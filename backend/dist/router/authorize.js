"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtService_1 = require("../services/jwtService");
const router = (0, express_1.Router)();
//認証
router.get('/', (req, res) => {
    const token = req.cookies.jwtToken;
    const resultObj = jwtService_1.jwtHelper.verifyToken(token);
    console.log(token);
    if (resultObj.result) {
        res.json({
            result: true
        });
    }
    else {
        res.json({
            result: false
        });
    }
});
exports.default = router;
//# sourceMappingURL=authorize.js.map