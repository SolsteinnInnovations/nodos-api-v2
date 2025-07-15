import path from 'path';
import { LogModel } from '../data/mongo/models/log.model';
import { Severidad } from '../enums/logSeverity.enum';

export const createLog = (severidad: Severidad,message:string) => {
    const stack = new Error().stack;
    const stackLines = stack?.split("\n") || [];
  
    // Normalmente: [0] = Error, [1] = logInfo, [2] = quien llama a logInfo
    const callerLine = stackLines[2] || "";
  
    // Extraer ruta, archivo y función si están disponibles
    const pathMatch = callerLine.match(/\((.*):\d+:\d+\)/);
    const fullPath = pathMatch?.[1] || "unknown";

    // Cortamos los últimos 3 segmentos del path (por ejemplo: src/presentation/auth/controller.ts)
    const pathParts = fullPath.split(path.sep);
    const lastPath = pathParts.slice(-3).join("/"); // ajustá el número si querés más o menos profundidad
    const functionMatch = callerLine.match(/at (.+?) \(/);
    const functionName = functionMatch?.[1] || "anonymous";
  
    const servicio = `${lastPath} -> ${functionName}`;
   
    LogModel.create({
        severidad,
        servicio,
        message
    }).catch((err) =>console.log(err) )

}