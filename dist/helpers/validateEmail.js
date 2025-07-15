"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const isEmail = (email) => {
    const isEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimEmail = isEmailRegex.test(email) ? email.trim() : "";
    if (!trimEmail) {
        throw new Error('El email ingresado no tiene forma de email');
    }
    return trimEmail;
};
exports.isEmail = isEmail;
//# sourceMappingURL=validateEmail.js.map