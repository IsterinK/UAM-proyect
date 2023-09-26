import React, { useEffect, useState } from 'react'
import {Auth} from "../../../api/auth"
import { Autocomplete, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "./SignUp.scss"

const SignUp = () => {
    const auth = new Auth();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    //Se ejecuta una vez cuando se carga el componente
    useEffect(() => {
        console.log("signup");
    }, []);

    const handleSetFirstname = (event) => {
        setFirstname(event.target.value);
    }

    const handleSetLastname = (event) => {
        setLastname(event.target.value);
    }

    const handleSave = async () => {
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            currentPassword: currentPassword
        }

        console.log(data)
        try {
            const response = await auth.signup();
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const documentTypeOptions = [
        { label: 'Cédula de ciudadanía', value: "C.C." },
        { label: 'Cédula de extrajería', value: "C.E" },
        { label: 'Tarjeta de identidad', value: "T.I." },
        { label: 'Pasaporte', value: "PP" },
    ]

  return (
    <>
        <div>
            <h2>SignUp</h2>
            <div className='auth-container'>
                <form>
                    <div className='auth-form'>
                        <div className='auth-form_row'>
                            <TextField 
                                id="firstname" 
                                label="Ingresa un valor" 
                                variant="standard"
                                value={firstname} 
                                className="input-auth-form" 
                                onChange={handleSetFirstname}
                            />

                            <TextField 
                                id="lastname" 
                                label="Ingresa un valor" 
                                variant="standard" 
                                value={lastname}
                                className="input-auth-form" 
                                onChange={handleSetLastname}
                            />
                        </div>
                        <div className='auth-form_row'>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
                            label="Password"
                        />
                        </div>
                        <div className='auth-form_row'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={documentTypeOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Selecciona una opción" />}
                        />
                        </div>
                    </div>
                    <button onClick={handleSave}>ENVIAR</button>
                </form>
            </div> 
        </div>
    </>
  )
}

export default SignUp
