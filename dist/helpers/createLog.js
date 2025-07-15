"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLog = void 0;
const path_1 = __importDefault(require("path"));
const log_model_1 = require("../data/mongo/models/log.model");
const createLog = (severidad, message) => {
    const stack = new Error().stack;
    const stackLines = stack?.split("\n") || [];
    // Normalmente: [0] = Error, [1] = logInfo, [2] = quien llama a logInfo
    const callerLine = stackLines[2] || "";
    // Extraer ruta, archivo y función si están disponibles
    const pathMatch = callerLine.match(/\((.*):\d+:\d+\)/);
    const fullPath = pathMatch?.[1] || "unknown";
    // Cortamos los últimos 3 segmentos del path (por ejemplo: src/presentation/auth/controller.ts)
    const pathParts = fullPath.split(path_1.default.sep);
    const lastPath = pathParts.slice(-3).join("/"); // ajustá el número si querés más o menos profundidad
    const functionMatch = callerLine.match(/at (.+?) \(/);
    const functionName = functionMatch?.[1] || "anonymous";
    const servicio = `${lastPath} -> ${functionName}`;
    log_model_1.LogModel.create({
        severidad,
        servicio,
        message
    }).catch((err) => console.log(err));
};
exports.createLog = createLog;
//# sourceMappingURL=createLog.js.map