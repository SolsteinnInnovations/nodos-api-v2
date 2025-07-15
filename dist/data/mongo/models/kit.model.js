"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Esquema de Mongoose para el modelo Kit
const kitSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precioVenta: {
        type: Number,
        required: true,
    },
    iva: {
        type: Number,
        required: false,
    },
    items: {
        type: Array,
        required: true
    },
    organizacion: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.KitModel = mongoose_1.default.model("Kit", kitSchema);
//# sourceMappingURL=kit.model.js.map