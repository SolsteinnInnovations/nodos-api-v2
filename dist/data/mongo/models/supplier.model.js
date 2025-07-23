"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const supplierSchema = new mongoose_1.default.Schema({
    razonSocial: {
        type: String,
        required: [true, 'Razon social is required']
    },
    InicioActividades: {
        type: Date,
    },
    estado: {
        type: Boolean,
        default: true
    },
    IVA: {
        type: String,
        default: 'Responsable Inscripto'
    },
    cuit: {
        type: String,
        required: [true, 'CUIT is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    telefono: {
        type: String,
        default: false
    },
    domicilio: {
        type: String,
        default: false
    },
    localidad: {
        type: String,
        default: false
    },
    organizacion: {
        type: String,
        required: [true, 'Organizacion is required']
    }
}, {
    timestamps: true
});
exports.SupplierModel = mongoose_1.default.model('Supplier', supplierSchema);
//# sourceMappingURL=supplier.model.js.map