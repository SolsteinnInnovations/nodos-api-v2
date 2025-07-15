import mongoose, { Schema } from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Nombre is required"],
    },
    apellido: {
      type: String,
      required: [true, "Apellido is required"],
    },

    cuitCuil: {
      type: String,
      required: [false, "Cuit/Cuil is required"],
      unique: true,
      sparse:true

    },
    organizacion:{
      type: String,
      required: [false, "Organizacion is required"],
    },

    domicilio: {
      type: String,
      required: [false, "Domicilio is required"],
    },

    telefono: {
      type: String,
      required: [false, "Telefono is required"],
    },

    email: {
      type: String,
      required: [false, "Email is required"],
      unique: false,
        sparse:true
    },
    localidad: {
      type: String,
      required: [false, "Localidad is required"],
    },
    provincia: {
      type: String,
      required: [false, "Provincia is required"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
    fechaNacimiento: {
      type: Date,
      required: [false, "Fecha de nacimiento is required"],
    },

    emailValidated: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
  }
);


export const ClientModel = mongoose.model("Client", clientSchema);
 ClientModel.syncIndexes()
