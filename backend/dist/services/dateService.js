"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysLater = void 0;
//X日後の日付を求める
const getDaysLater = (days) => {
    const today = new Date();
    let result = new Date();
    result.setDate(today.getDate() + days);
    return result;
};
exports.getDaysLater = getDaysLater;
//# sourceMappingURL=dateService.js.map