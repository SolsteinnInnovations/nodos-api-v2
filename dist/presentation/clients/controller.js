"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const class_validator_1 = require("class-validator");
const client_model_1 = require("../../data/mongo/models/client.model");
const validateEmail_1 = require("../../helpers/validateEmail");
class ClientController {
    constructor() { }
    createClient = async (req, res) => {
        try {
            const { nombre, email = '', ...rest } = req.body;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            const newNombre = nombre.toLowerCase().trim();
            let newEmail;
            if (email) {
                newEmail = (0, validateEmail_1.isEmail)(email);
                rest.email = newEmail;
            }
            // Crear el cliente con el organizationId
            const newClient = await client_model_1.ClientModel.create({
                nombre: newNombre,
                organizacion: organizationId, // Asignar organizationId del usuario,
                ...rest
            });
            res.status(200).json({
                msg: "Cliente creado correctamente",
                newClient
            });
        }
        catch (error) {
            console.error('Error creating client:', error);
            res.status(500).json({ message: "Error al crear el cliente", error });
        }
    };
    getClients = async (req, res) => {
        try {
            const clients = await client_model_1.ClientModel.find();
            res.status(200).json({ clients });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener los clientes", error });
        }
    };
    getClient = async (req, res) => {
        try {
            const { term } = req.params;
            let query;
            if ((0, class_validator_1.isMongoId)(term)) {
                query = { _id: term };
            }
            else if (!isNaN(Number(term))) {
                query = { codigo: term };
            }
            else {
                const terms = term.split(' ').map(t => new RegExp(t, 'i'));
                if (terms.length > 1) {
                    query = {
                        $and: [
                            { $or: [{ nombre: terms[0] }, { apellido: terms[0] }] },
                            { $or: [{ nombre: terms[1] }, { apellido: terms[1] }] }
                        ]
                    };
                }
                else {
                    query = {
                        $or: [
                            { nombre: terms[0] },
                            { apellido: terms[0] }
                        ]
                    };
                }
            }
            const client = await client_model_1.ClientModel.find(query);
            res.status(200).json({ client });
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el cliente", error });
        }
    };
    updateClient = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, telefono, ...rest } = req.body;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            const updateData = { ...rest };
            if (telefono) {
                const numeroRegex = /^-?(?:\d+\.?\d*|\.\d+)$/;
                if (numeroRegex.test(telefono)) {
                    updateData.telefono = telefono;
                }
                else {
                    throw new Error('El telefono: ' + telefono + " no es un telefono valido");
                }
            }
            if (nombre) {
                updateData.nombre = nombre.toLowerCase().trim();
            }
            // Verificar si el cliente existe y pertenece a la organización
            const client = await client_model_1.ClientModel.findOne({ _id: id }); // Casting a IClient
            if (!client) {
                res.status(404).json({ message: "Cliente no encontrado" });
                return;
            }
            if (client.organizacion !== organizationId) {
                res.status(403).json({ message: "No tienes permiso para actualizar este cliente" });
                return;
            }
            // Actualizar el cliente
            const updatedClient = await client_model_1.ClientModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, updateData, { new: true });
            res.status(200).json({ message: "Cliente actualizado correctamente", client: updatedClient });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el cliente", error });
        }
    };
    deleteClient = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            // Verificar si el cliente existe y pertenece a la organización 
            const client = await client_model_1.ClientModel.findOne({ _id: id }); // Casting a IClient
            if (!client) {
                res.status(404).json({ message: "Cliente no encontrado" });
                return;
            }
            if (client.organizacion !== organizationId) {
                res.status(403).json({ message: "No tienes permiso para eliminar este cliente" });
                return;
            }
            // Eliminar el cliente
            await client_model_1.ClientModel.findOneAndDelete({ _id: id, organizacion: organizationId });
            res.status(200).json({ message: "Cliente eliminado correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar el cliente", error });
        }
    };
}
exports.ClientController = ClientController;
//# sourceMappingURL=controller.js.map