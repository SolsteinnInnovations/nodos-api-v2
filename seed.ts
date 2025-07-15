import { UserModel } from "./src/data/mongo/models/user.model";
import { ClientModel } from "./src/data/mongo/models/client.model";
import { SupplierModel } from "./src/data/mongo/models/supplier.model";
import { MongoDatabase } from "./src/data/mongo/mongo-database";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config({
    path: './.env'
});

const seedData = async () => {
  try {
    await MongoDatabase.connect({
        dbName: 'Solsteinn_test',
        mongoUrl: process.env.MONGODB_CONNECTION || 'your_default_mongo_url'
    });

    // Eliminar datos previos
    await UserModel.deleteMany({});
    console.log("🗑️  Usuarios eliminados");

    await ClientModel.deleteMany({});
    console.log("🗑️  Clientes eliminados");

    await SupplierModel.deleteMany({});
    console.log("🗑️  Proveedores eliminados");

    // Hashear la contraseña para los usuarios
    const hashedPassword = await bcrypt.hash("solsteinnpassword", 10);

    // Insertar nuevos usuarios
    const users = [
      {
          username: "juanperez",
          email: "juanperez@gmail.com",
          emailValidated: false,
          password: hashedPassword,
          role: ["ADMIN_ROLE"],
          estado: true,
          __v: 0
      },
      {
          username: "pedrolopez",
          email: "pedrolopez@gmail.com",
          emailValidated: false,
          password: hashedPassword,
          role: ["USER_ROLE"],
          estado: true,
          __v: 0
      },
      {
          username: "mariafernandez",
          email: "mariafernandez@gmail.com",
          emailValidated: false,
          password: hashedPassword,
          role: ["USER_ROLE"],
          estado: true,
          __v: 0
      },
      {
          username: "luismartinez",
          email: "luismartinez@gmail.com",
          emailValidated: false,
          password: hashedPassword,
          role: ["USER_ROLE"],
          estado: true,
          __v: 0
      }
    ];

    await UserModel.insertMany(users);
    console.log("✅ Usuarios insertados correctamente");

    // Insertar nuevos clientes
    const clients = [
      {
        nombre: "Carlos",
        apellido: "Gonzalez",
        cuitCuil: "20-12345678-9",
        domicilio: "Calle Falsa 123",
        telefono: "123456789",
        email: "carlosgonzalez@gmail.com",
        iva: "Responsable Inscripto",
        localidad: "Buenos Aires",
        provincia: "Buenos Aires",
        estado: true,
        fechaNacimiento: new Date("1985-05-15"),
        emailValidated: false
      },
      {
        nombre: "Ana",
        apellido: "Martinez",
        cuitCuil: "27-98765432-1",
        domicilio: "Avenida Siempreviva 742",
        telefono: "987654321",
        email: "anamartinez@gmail.com",
        iva: "Monotributista",
        localidad: "Rosario",
        provincia: "Santa Fe",
        estado: true,
        fechaNacimiento: new Date("1990-10-20"),
        emailValidated: true
      }
    ];

    await ClientModel.insertMany(clients);
    console.log("✅ Clientes insertados correctamente");

    // Insertar nuevos proveedores
    const suppliers = [
      {
        razonSocial: "Proveedor Uno S.A.",
        InicioActividades: new Date("2000-01-01"),
        estado: true,
        IVA: "Responsable Inscripto",
        cuit: "30-12345678-9",
        email: "contacto@proveedoruno.com",
        telefono: "1122334455",
        domicilio: "Calle Comercio 123",
        localidad: "Córdoba"
      },
      {
        razonSocial: "Proveedor Dos S.R.L.",
        InicioActividades: new Date("2010-05-15"),
        estado: true,
        IVA: "Monotributista",
        cuit: "30-98765432-1",
        email: "ventas@proveedordos.com",
        telefono: "2233445566",
        domicilio: "Avenida Industrial 456",
        localidad: "Mendoza"
      }
    ];

    await SupplierModel.insertMany(suppliers);
    console.log("✅ Proveedores insertados correctamente");

    process.exit(); // Finalizar script
  } catch (error) {
    console.error("❌ Error en el seed:", error);
    process.exit(1);
  }
};

seedData();