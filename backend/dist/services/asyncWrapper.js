"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    };
};
exports.default = asyncWrapper;
//# sourceMappingURL=asyncWrapper.js.map