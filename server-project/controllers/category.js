const Category = require("../models/category")

//Crear una categoria
const createCategory = async (req, res) => {
    const { name } = req.body
    if(name !== null){
        const new_category = await Category({
            name, active: true
        }) 

        const categoryDB = await new_category.save()
        res.status(201).json(categoryDB)

    }else{
        throw new Error("Faltan campos requeridos")
    }
}

//Obtener todas las categorias
const getAllCategories = async (req, res) => {
    try {
        const response = await Category.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

// Consultar una Categoria
const getCategoryById = async (req, res) => {
    const { categoryId } = req.params
    try {
        console.log(categoryId)
        const response = await Category.findById(categoryId)
        if(response !== null){
            res.status(200).json(response)
        }else {
            throw new Error("La categoria no existe")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//Editar una categoria

const editCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const categoryData= req.body
        console.log(categoryData)
        await Category.findByIdAndUpdate(categoryId, categoryData);
        res.status(200).json({ message: "Categoria Actualizada"})
    } catch (error) {
        res.status(400).json(error)
    }
}

//Eliminar Categoria

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        await Category.findByIdAndDelete(categoryId)
        res.status(200).json({ message: "Categoria Eliminada"})
      } catch (error) {
        res.status(400).json(error)
      } 
}

module.exports = {
    createCategory, 
    getAllCategories,
    getCategoryById,
    editCategory,
    deleteCategory
}