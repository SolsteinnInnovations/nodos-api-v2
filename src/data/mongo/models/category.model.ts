import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    nombre:{
        type: String,
        required: [true, "Nombre is required"],
    },
    descripcion: {
      type: String,
      required: [false],
    },
    organizacion: {
      type: String,
      required: [true, "Organización is required"],
    },    
    estado: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
    strict: true
  }
);


export const CategoryModel = mongoose.model("Category", categorySchema);
