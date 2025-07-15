"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Definir el esquema de Mongoose
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        // default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    idSucursal: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: false,
    }
});
// Crear el modelo
exports.UserModel = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map