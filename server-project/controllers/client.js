const Client = require("../models/client")
const img = require("../utils/image")

//Crear un Cliente

const createClient = async (req, res) => {

    const { name, email } = req.body
    const files = req.files

    if (name !== null && email !== null && files !== null) {

        const new_Client = await Client({
            name, email, active: true, photo: files.map(file=>img.getImageUrl(file.path.replaceAll('\\', '/')))
        })

        const clientDB = await new_Client.save()
        res.status(201).json(clientDB)
        
    } else {
        throw new Error("Faltan campos requeridos");
    }
}

//Obtener todos los Clientes

const getAllClients = async (req, res) => {
    try {
        const response = await Client.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

// Consultar un Cliente

const getClientById = async (req, res) => {
    const { clientId } = req.params
    try {
        console.log(clientId)
        const response = await Client.findById(clientId)
        if(response !== null){
            res.status(200).json(response)
        }else {
            throw new Error("El Cliente no existe")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//Editar un Servicio

const editClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const clientData= req.body
        console.log(clientData)
        await Client.findByIdAndUpdate(clientId, clientData);
        res.status(200).json({ message: "Cliente Actualizado"})
    } catch (error) {
        res.status(400).json(error)
    }
}

//Eliminar un servicio

const deleteClient = async (req, res) => {
    try {
        const { clientId } = req.params
        await Client.findByIdAndDelete(clientId)
        res.status(200).json({ message: "Cliente Eliminado"})
      } catch (error) {
        res.status(400).json(error)
      } 
}

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    editClient,
    deleteClient
}