import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

interface PDFData {
  nombre: string;
  cuitCuil: string;
  domicilio: string;
  fecha: string;
  items: {
    producto: string;
    cantidad: number;
    precioUnitario: number;
  }[];
  subtotal: number;
  total: number;
  iva?: number;
}

export const generatePDF = (data: PDFData): PassThrough => {
  const doc = new PDFDocument({ margin: 50 });
  const stream = new PassThrough();

  // Conectar el stream del PDF
  doc.pipe(stream);

  // Encabezado
  doc
    .fontSize(20)
    .text("Factura de Compra", { align: "center" })
    .moveDown();

  // Información del cliente
  doc
    .fontSize(12)
    .text(`Cliente: ${data.nombre}`, { align: "left" })
    .text(`CUIT: ${data.cuitCuil}`, { align: "left" })
    .text(`Domicilio: ${data.domicilio}`, { align: "left" })
    .text(`Fecha: ${data.fecha}`, { align: "left" })
    .moveDown();

  // Dibujar tabla
  const tableTop = doc.y;
  const col1 = 50;
  const col2 = 200;
  const col3 = 350;
  const col4 = 450;
  const rowHeight = 25;

  // Encabezado de la tabla
  doc
    .fontSize(12)
    .text("Producto", col1, tableTop)
    .text("Cantidad", col2, tableTop)
    .text("Precio Unitario", col3, tableTop)
    .text("Subtotal", col4, tableTop)
    .moveDown();

  // Filas de la tabla
  let yPosition = tableTop + rowHeight;
  data.items.forEach((item) => {
    doc
      .fontSize(10)
      .text(item.producto, col1, yPosition)
      .text(item.cantidad.toString(), col2, yPosition)
      .text(`$${item.precioUnitario.toFixed(2)}`, col3, yPosition)
      .text(`$${(item.cantidad * item.precioUnitario).toFixed(2)}`, col4, yPosition);
    yPosition += rowHeight;
  });

  doc.moveDown(2);

  // Totales
  doc
    .fontSize(14)
    .text(`Subtotal: $${data.subtotal.toFixed(2)}`, { align: "right" })
    .text(`IVA: $${data.iva?.toFixed(2) || 0}`, { align: "right" })
    .text(`Total: $${data.total.toFixed(2)}`, { align: "right" })
    .moveDown();

  // Finalizar el documento
  doc.end();

  return stream;
};