"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnsModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const returnsSchema = new mongoose_1.default.Schema({
    idProducto: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "El ID del producto es requerido"],
    },
    cantidad: {
        type: Number,
        required: [true, "La cantidad es requerida"],
    },
    precio: {
        type: Number,
        required: [false, "El precio es requerido"],
    },
    idFacturaProveedor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SupplierInvoice",
        required: [false, "El ID de la factura del proveedor es requerido"],
    },
    idSucursal: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Sucursal",
        required: [true, "El ID de la sucursal es requerido"],
    },
    observaciones: {
        type: String,
    },
    organizacion: {
        type: String,
        required: [true, "La organización es requerida"],
    },
}, {
    timestamps: true, // createdAt y updatedAt automáticos
});
exports.ReturnsModel = mongoose_1.default.model("Returns", returnsSchema);
//# sourceMappingURL=returns.model.js.map