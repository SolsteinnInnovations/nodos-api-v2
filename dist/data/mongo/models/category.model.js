"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre is required"],
    },
    descripcion: {
        type: String,
        required: [false],
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
    strict: true
});
exports.CategoryModel = mongoose_1.default.model("Category", categorySchema);
//# sourceMappingURL=category.model.js.map