import React, { useState } from 'react';
import { Auth } from "../../../api/index";
import "./LogIn.scss"
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const auth = new Auth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  const handleLogin = async () => {
    const data = {
        email: email,
        password: password
    }
    try {
        const response = await auth.login(data);
        console.log(response)
    } catch (error) {
        console.error(error)
    }
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

        <FormControl>
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
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
