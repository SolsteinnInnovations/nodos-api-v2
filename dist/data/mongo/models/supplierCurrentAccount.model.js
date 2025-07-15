"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierCurrentAccountModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const supplierCurrentAccountSchema = new mongoose_1.default.Schema({
    importe: {
        type: Number,
        required: [false],
    },
    deudaTotal: {
        type: Number,
        required: [true, "Organizacion is required"],
    },
    factura: {
        type: String,
        required: [false],
    },
    estado: {
        type: Boolean,
        required: [false],
    },
    fechaPago: {
        type: Date,
        required: [false],
    },
    proveedor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "supplier",
        required: [false, "Organizacion is required"],
    },
    organizacion: {
        type: String,
        required: [false, "Organizacion is required"],
    },
}, {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
});
exports.supplierCurrentAccountModel = mongoose_1.default.model("supplierCurrentAccount", supplierCurrentAccountSchema);
//# sourceMappingURL=supplierCurrentAccount.model.js.map