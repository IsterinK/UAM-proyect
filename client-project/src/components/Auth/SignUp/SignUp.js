import React, { useEffect, useState } from 'react';
import { Auth } from "../../../api/auth";
import { Autocomplete, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./SignUp.scss";

const SignUp = () => {
    const auth = new Auth();
    // User
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    // Errors
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Se ejecuta una vez cuando se carga el componente
    useEffect(() => {
        if (currentPassword !== confirmPassword) {
            setOpenSnackbar(true);
            setSnackbarMessage("Las contraseñas no coinciden")
        } else {
            setOpenSnackbar(false);
            setSnackbarMessage("");
        }
    }, [currentPassword, confirmPassword]);

    const handleSetFirstname = (event) => {
        setFirstname(event.target.value);
    }

    const handleSetLastname = (event) => {
        setLastname(event.target.value);
    }

    const handleSetEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleSetPassword = (event) => {
        const newPassword = event.target.value;
        setCurrentpassword(newPassword);
    }

    const handleSave = async () => {
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            currentPassword: currentPassword
        }

        console.log(data);
        /* try {
            const response = await auth.signup();
            console.log(response)
        } catch (error) {
            console.error(error)
        } */
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

    // Componente personalizado para el Snackbar
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <>
            <h2>SignUp</h2>
            <div className='auth-container'>
                <form className='form'>
                    <div className='auth-form'>
                        <div className='auth-form_row'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={documentTypeOptions}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Tipo de documento" />}
                            />
                        </div>

                        <div className='auth-form_row'>
                            <TextField
                                id="firstname"
                                label="Nombre"
                                variant="standard"
                                value={firstname}
                                className="input-auth-form"
                                onChange={handleSetFirstname}
                            />
                        </div>

                        <div className='auth-form_row'>
                            <TextField
                                id="lastname"
                                label="Apellido"
                                variant="standard"
                                value={lastname}
                                className="input-auth-form"
                                onChange={handleSetLastname}
                            />
                        </div>

                        <div className='auth-form_row'>
                            <TextField
                                id="email"
                                label="Email"
                                variant="standard"
                                value={email}
                                className="input-auth-form"
                                onChange={handleSetEmail}
                            />
                        </div>

                        <div className='auth-form_row'>
                            <FormControl>
                                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                <OutlinedInput
                                    label="Contraseña"
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleSetPassword}
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
                        </div>

                        <div className='auth-form_row'>
                            <FormControl>
                                <InputLabel htmlFor="outlined-adornment-confirm-password">Confirmar contraseña</InputLabel>
                                <OutlinedInput
                                    label="Confirmar contraseña"
                                    id="outlined-adornment-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
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
                        </div>
                    </div>
                </form>
                <button onClick={handleSave}>ENVIAR</button>
            </div>
            <Snackbar
                open={openSnackbar}
            >
                <MuiAlert onClose={() => setOpenSnackbar(false)} severity="error">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
}

export default SignUp;
