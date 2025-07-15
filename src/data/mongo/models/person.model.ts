import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    dni: {
      type: String,
      required: [true, "Código is required"],
    },
    nombre: {
      type: String,
      required: [true, "Nombre is required"],
    },
    apellido: {
      type: String,
      required: [true, "Apellido is required"],
    },
    telefono: {
      type: String,
      required: [true, "Telefono is required"],
    },

    domicilio: {
      type: String,
      required: [true, "Domicilio is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    fechaNacimiento: {
      type: Date,
      required: [true, "Fecha de nacimiento is required"],
    },
    fechaIngreso: {
      type: Date,
      required: [false],
    },

    cargo: {
        type: String,
        required: [false],
    },

    estado:{
        type: Boolean,
        required: [false],
    },

    organizacion: {
      type: String,
      required: [true, "Organización is required"],
    },
  },
  {
    timestamps: true,
  }
);



export const PersonModel = mongoose.model("Person", personSchema);
