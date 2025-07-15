"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSucursalModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSucursal = new mongoose_1.default.Schema({
    stock: {
        type: Number,
        required: [true, "stock is required"],
    },
    habilitado: {
        type: Boolean,
        default: true,
    },
    producto: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    precioCosto: {
        type: Number,
        required: [true, "Precio is required"],
    },
    precioVentaSucursal: {
        type: Number,
        required: [true, "Precio venta is required"],
    },
    sucursal: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Sucursal",
        required: true,
    },
    organizacion: {
        type: String,
        required: [true, "Organización is required"],
    }
}, {
    timestamps: true,
});
exports.ProductSucursalModel = mongoose_1.default.model("ProductSucursal", productSucursal);
//# sourceMappingURL=productSucursal.model.js.map