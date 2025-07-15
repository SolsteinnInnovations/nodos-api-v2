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
exports.clientInvoiceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const clientInvoiceSchema = new mongoose_1.default.Schema({
    numeroFactura: {
        type: String,
        required: [true, "Numero Factura is required"],
    },
    detalles: {
        type: String,
        required: [false],
    },
    descuento: {
        type: Number,
        required: [false],
    },
    organizacion: {
        type: String,
        required: [true, "Organizacion is required"],
    },
    recargo: {
        type: Number,
        required: [false],
    },
    subtotal: {
        type: Number,
        required: [false, "Organizacion is required"],
    },
    total: {
        type: Number,
        required: [false],
    },
    tipoFactura: {
        type: String,
        required: [false],
    },
    metodosDePago: {
        type: Array,
        required: [true],
    },
    condicionIva: {
        type: String,
        required: [false],
    },
    items: {
        type: Array,
        required: [false],
    },
    fecha: {
        type: Date,
        required: [false],
    },
    fechaPago: {
        type: Date,
        required: [false],
    },
    estado: {
        type: Boolean,
        required: [false],
    },
    caja: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "dailyCash",
        required: [false],
    },
    idSucursal: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Sucursal",
        required: [false],
    },
    usuario: {
        type: String,
        required: [false],
    },
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Client",
        required: [false],
    },
}, {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
});
clientInvoiceSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._v;
        delete ret.uid;
    },
});
exports.clientInvoiceModel = mongoose_1.default.model("clientInvoice", clientInvoiceSchema);
//# sourceMappingURL=clientInvoice.model.js.map