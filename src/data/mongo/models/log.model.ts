import mongoose from "mongoose";
import { Severidad } from "../../../enums/logSeverity.enum";

const logSchema = new mongoose.Schema(
  {
    severidad:{
      type: String,
      enum: Severidad,
      required: true
    },
    servicio: {
      type: String,
      default: 'Sin servicio'
 
    },
    message:{
        type: String,
        default: 'sin mensaje'
    }
  },
  {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
  }
);


export const LogModel = mongoose.model("Log", logSchema); 