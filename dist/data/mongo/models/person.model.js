"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const personSchema = new mongoose_1.default.Schema({
    dni: {
        type: String,
        required: [true, "Código is required"],
    },
    nombre: {
        type: String,
        required: [true, "Nombre is required"],
    },
    apellido: {
        type: String,
        required: [true, "Apellido is required"],
    },
    telefono: {
        type: String,
        required: [true, "Telefono is required"],
    },
    domicilio: {
        type: String,
        required: [true, "Domicilio is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    fechaNacimiento: {
        type: Date,
        required: [true, "Fecha de nacimiento is required"],
    },
    fechaIngreso: {
        type: Date,
        required: [false],
    },
    cargo: {
        type: String,
        required: [false],
    },
    estado: {
        type: Boolean,
        required: [false],
    },
    organizacion: {
        type: String,
        required: [true, "Organización is required"],
    },
}, {
    timestamps: true,
});
exports.PersonModel = mongoose_1.default.model("Person", personSchema);
//# sourceMappingURL=person.model.js.map