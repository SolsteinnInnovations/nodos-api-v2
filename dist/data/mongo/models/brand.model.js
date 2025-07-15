"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre is required"],
    },
    descripcion: {
        type: String,
        required: [true, "Descripcion is required"],
    },
    habilitado: {
        type: Boolean,
        default: true,
    },
    organizacion: {
        type: String,
        required: [true, "Organización is required"],
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
});
exports.BrandModel = mongoose_1.default.model("Brand", brandSchema);
//# sourceMappingURL=brand.model.js.map