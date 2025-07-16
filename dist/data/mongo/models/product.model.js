"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    codigo: {
        type: String,
        required: [true, "Código is required"],
    },
    nombre: {
        type: String,
        required: [true, "Nombre is required"],
    },
    descripcion: {
        type: String,
        default: 'Producto sin descripción',
    },
    // stock: {
    //   type: Number,
    //   required: true,
    // },
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
    iva: {
        type: Number,
        default: 21,
    },
    marca: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    categoria: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
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
exports.ProductModel = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=product.model.js.map