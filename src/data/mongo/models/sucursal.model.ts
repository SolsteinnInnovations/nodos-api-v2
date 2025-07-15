import mongoose from "mongoose";

const sucursalSchema = new mongoose.Schema(
    {
        descripcion:{
            type: String,
            required: [true, "Descripción is required"],
        },
        habilitadoParaVender:{
            type: Boolean,
            default: true,
        },
        direccion:{
            type: String,
            required: [true, "Dirección is required"],
        },
        organizacion: {
            type: String,
            required: [true, "Organización is required"],
        },
        estado: {
            type: Boolean,
            default: true
        }
        
    },{
        timestamps: true,
    }
)


export const SucursalModel = mongoose.model("Sucursal", sucursalSchema);