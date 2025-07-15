export interface IClientInvoice {
  puntoVenta: string;
  numeroFactura: string;
  descuento: number;
  organizacion: string;
  recargo: number;
  precioSinIva?: number;
  subtotal?: number;
  total?: number;
  devolucion?: number;
  tipoFactura?: string;
  metodosDePago: string;
  condicionIva?: string;
  items?: any[]; // Puedes definir un tipo más específico si los items tienen una estructura definida
  idProductos?: any[]; // Puedes definir un tipo más específico si los productos tienen una estructura definida
  fecha?: Date;
  fechaPago?: Date;
  cantidadTotal?: number;
  estado?: boolean;
  caja?: number;
  nombre?: string;
  cuitCuil?: string;
  domicilio?: string;
  localidad?: string;
  provincia?: string;
  telefono?: string;
  sucursal?: string;
  usuario?: string;
  esCuentaCorriente?: boolean;
  cliente?: string;
  createdAt?: Date;
  updatedAt?: Date;
}