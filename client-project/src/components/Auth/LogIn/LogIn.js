import React, { useState } from 'react';
import { Auth } from "../../../api/index";
import "./LogIn.scss";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Button, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = new Auth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage('El email y la contraseña son obligatorios.');
      setSnackbarOpen(true);
      return;
    }

    const data = {
      email: email,
      password: password
    };

    try {
      const response = await auth.login(data);
      if(response === "true"){
        navigate("/admin/users");
      }else if(response === "Contraseña incorrecta"){
        setSnackbarMessage(response);
        setSnackbarOpen(true);
      }else if(response === "Usuario no autorizado o no activo"){
        setSnackbarMessage(response);
        setSnackbarOpen(true);
      }else if(response === "El usuario no existe"){
        setSnackbarMessage(response);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='container'>
      <h2>Iniciar sesión</h2>

      <TextField
        label="Email"
        variant="outlined"
        value={email}
        className="input-auth-form"
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormControl className="input-auth-form">
        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
        <OutlinedInput
          label="Contraseña"
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="outlined"
        onClick={handleLogin}
        sx={{}}
      >
        Iniciar sesión
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Login;
