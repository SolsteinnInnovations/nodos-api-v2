import mongoose from "mongoose";

const premissionSchema = new mongoose.Schema(
    {

          nombre:{
            type: String,
            required: [true, "nombre is required"],
        },
        descripcion:{
            type: String,
            required: [true, "Descripción is required"],
        }
       
        
    },{
        timestamps: true,
    }
)


export const PermissionModel = mongoose.model("Permission", premissionSchema);