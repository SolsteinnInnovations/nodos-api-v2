export interface ISupplier {
    razonSocial: string;
    InicioActividades: Date;
    estado: boolean;
    IVA: string;
    cuit: string;
    email: string;
    telefono: string;
    domicilio: string;
    localidad: string;
    organizacion: string;
    createdAt?: Date;
    updatedAt?: Date;
}
