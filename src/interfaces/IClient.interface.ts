

export interface IClient {
    nombre: string;
    apellido: string;
    cuitCuil: string;
    organizacion: string;
    domicilio: string;
    telefono: string;
    email: string;
    iva: string;
    localidad: string;
    provincia: string;
    estado?: boolean;
    fechaNacimiento?: Date;
    emailValidated?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }