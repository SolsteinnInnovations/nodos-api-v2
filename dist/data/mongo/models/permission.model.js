"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const premissionSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    descripcion: {
        type: String,
        required: [true, "Descripción is required"],
    }
}, {
    timestamps: true,
});
exports.PermissionModel = mongoose_1.default.model("Permission", premissionSchema);
//# sourceMappingURL=permission.model.js.map