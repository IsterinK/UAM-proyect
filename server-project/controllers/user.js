const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");


// Crear usuario
const register = async (req, res) => {
  const { name, lastmane, email, password, address } = req.body;
  if(name !==null && lastmane !== null && email !== null && password !== null && address !== null){
    console.log("Contraseña", password)
    const enscriptar_contraseña = await bcrypt.genSalt(10)
    const contraseña = await bcrypt.hash(password, enscriptar_contraseña)
    console.log("Contraseña encriptada", contraseña)
    const new_user = await User({
        name, lastmane, email: email.toLowerCase(), password: contraseña, address, active: true, rol:"user"
    })
    console.log("Usuario creado ", new_user)
    const userDB = await new_user.save()
    res.status(201).json(userDB)
  } else {
    console.log("Faltan campos requeridos")
  }
  
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      throw new Error("El email y la contraseña son obligatorios");
    }
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase }).exec();
    if (!userStore) {
      throw new Error("El usuario no existe");
    }
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      throw new Error("Contraseña incorrecta");
    }
    if (!userStore.active) {
      throw new Error("Usuario no autorizado o no activo");
    }
    res.status(200).send({
      access: jwt.createAccessToken(userStore),
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
    console.log();
  }
};

//Consultar usuario creado
const getAllUsers = async (req, res) => {
  try {
    const response = await User.find()
    res.status(200).json({ message: "Lista de usuarios:" }, response)
  } catch (error) {
    res.status(500).json(error)
  }
};

//Consultar por id
const getById = async (req, res) =>{
  const userId = req.params;
  console.log(userId);
  try {
    const response = await User.findById(userId)  
    if(!response){
      throw new Error("El usuario no existe")
    }else{
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error)
  } 
};

//Actualizar Usuario
const updateUser = async (req, res) => {
  try{
    const {userId} = req.params;
    const userData = req.body;
    if(userData.password){
      const enscriptar_contraseña = await bcrypt.genSalt(10);
      const contrasena = await bcrypt.hash(password, enscriptar_contraseña)
      userData.password = contrasena
    }
    await User.findByIdAndUpdate(userId, userData);
    res.status(200).json({ message: "Usuario actualizado" })
  }catch (error){
    res.status(400).json(error);
  }
};

//Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params
    await User.findByIdAndDelete(userId)
    res.status(200).json({ message: "Usuario eliminado" })
  } catch (error) {
    res.status(400).json(error)
  }
};

module.exports = {
  register, 
  login,
  getAllUsers,
  getById,
  updateUser, 
  deleteUser
};