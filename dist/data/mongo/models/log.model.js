"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logSeverity_enum_1 = require("../../../enums/logSeverity.enum");
const logSchema = new mongoose_1.default.Schema({
    severidad: {
        type: String,
        enum: logSeverity_enum_1.Severidad,
        required: true
    },
    servicio: {
        type: String,
        default: 'Sin servicio'
    },
    message: {
        type: String,
        default: 'sin mensaje'
    }
}, {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
});
exports.LogModel = mongoose_1.default.model("Log", logSchema);
//# sourceMappingURL=log.model.js.map