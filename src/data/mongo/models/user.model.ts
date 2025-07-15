import mongoose, { Document } from 'mongoose';

// Definir la interfaz IUser
interface IUser extends Document {
  username: string;
  email: string;
  emailValidated: boolean;
  password: string;
  img?: string;
  role: string[];
  estado: boolean;
  idSucursal?: mongoose.Schema.Types.ObjectId; // Referencia a Sucursal
}

// Definir el esquema de Mongoose
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    // default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  
idSucursal:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sucursal',
    required: false,
  }


});


// Crear el modelo
export const UserModel = mongoose.model<IUser>('User', userSchema);
