import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Nombre is required"],
    },
    descripcion: {
      type: String,
      required: [true, "Descripcion is required"],
    },
    habilitado:{
        type: Boolean,
        default: true,
    } , 
    organizacion: {
      type: String,
      required: [true, "Organización is required"],
    },
    estado:{
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
  }
);

export const BrandModel = mongoose.model("Brand", brandSchema); 