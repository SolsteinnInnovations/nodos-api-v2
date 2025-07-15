"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const stream_1 = require("stream");
const generatePDF = (data) => {
    const doc = new pdfkit_1.default({ margin: 50 });
    const stream = new stream_1.PassThrough();
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
exports.generatePDF = generatePDF;
//# sourceMappingURL=generatepdf.js.map