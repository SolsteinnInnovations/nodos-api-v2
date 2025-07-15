"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SucursalModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sucursalSchema = new mongoose_1.default.Schema({
    descripcion: {
        type: String,
        required: [true, "Descripción is required"],
    },
    habilitadoParaVender: {
        type: Boolean,
        default: true,
    },
    direccion: {
        type: String,
        required: [true, "Dirección is required"],
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
    timestamps: true,
});
exports.SucursalModel = mongoose_1.default.model("Sucursal", sucursalSchema);
//# sourceMappingURL=sucursal.model.js.map