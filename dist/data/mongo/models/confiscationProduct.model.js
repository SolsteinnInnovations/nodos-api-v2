"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confiscationProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const confiscationProductSchema = new mongoose_1.default.Schema({
    idProducto: {
        type: String,
        required: [true, "Id is required"],
    },
    nombre: {
        type: String,
        required: [true, "Nombre is required"],
    },
    descripcion: {
        type: String,
        default: false,
    },
    stock: {
        type: Number,
        required: true,
    },
    precioLista: {
        type: Number,
        required: [true, "Precio lista is required"],
    },
    precioVenta: {
        type: Number,
        required: [true, "Precio venta is required"],
    },
    poseeIva: {
        type: Boolean,
        default: false,
    },
    cantidadDecomisada: {
        type: Number,
        required: [true, "Cantidad decomisada is required"],
    },
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Brand",
        required: false, // Confirmamos que no es requerido
    },
    iva: {
        type: Number,
        default: 21,
    },
    motivoDescomiso: {
        type: String,
        required: [true, "Motivo decomiso is required"],
    },
    categoria: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    sucursal: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Sucursal",
        required: true,
    },
    organizacion: {
        type: String,
        required: [true, "Organización is required"],
    },
    usuario: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.confiscationProductModel = mongoose_1.default.model("confiscationProduct", confiscationProductSchema);
//# sourceMappingURL=confiscationProduct.model.js.map