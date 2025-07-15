"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clientSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre is required"],
    },
    apellido: {
        type: String,
        required: [true, "Apellido is required"],
    },
    cuitCuil: {
        type: String,
        required: [false, "Cuit/Cuil is required"],
        unique: true,
        sparse: true
    },
    organizacion: {
        type: String,
        required: [false, "Organizacion is required"],
    },
    domicilio: {
        type: String,
        required: [false, "Domicilio is required"],
    },
    telefono: {
        type: String,
        required: [false, "Telefono is required"],
    },
    email: {
        type: String,
        required: [false, "Email is required"],
        unique: false,
        sparse: true
    },
    localidad: {
        type: String,
        required: [false, "Localidad is required"],
    },
    provincia: {
        type: String,
        required: [false, "Provincia is required"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    fechaNacimiento: {
        type: Date,
        required: [false, "Fecha de nacimiento is required"],
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
});
exports.ClientModel = mongoose_1.default.model("Client", clientSchema);
exports.ClientModel.syncIndexes();
//# sourceMappingURL=client.model.js.map