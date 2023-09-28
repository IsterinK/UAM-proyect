import React, { useEffect, useState } from 'react';
import { Auth } from "../../../api";
import { InputLabel, FormControl, Autocomplete, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Modal, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./SignUp.scss";

const style = {
    position: 'absolute',
    maxHeight: '80vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    pt: 2,
    px: 4,
    pb: 3,
  };


const SignUp = () => {
    /* Regex for e-mail */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook.com|icloud.com|aol.com|protonmail.com|zoho.com)$/;
    /* new Instance of Auth */
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
    const [openSnackbarTerms, setOpenSnackbarTerms] = useState(false);
    const [snackbarMessageTerms, setSnackbarMessageTerms] = useState("");
    const [openSnackbarEmail, setOpenSnackbarEmail] = useState(false);
    const [snackbarMessageEmail, setSnackbarMessageEmail] = useState("");
    const [terms, setTerms] = useState(false);
    const [checkBox, setCheckBox] = useState(false);


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
        setOpenSnackbarEmail(false)
    }

    const handleSetPassword = (event) => {
        const newPassword = event.target.value;
        setCurrentpassword(newPassword);
    }

    const handleSetOpenTerms = () => {
        setTerms(true)
    }

    const handleSetCloseTerms = () => {
        setTerms(false)
    }

    const handleSetCheckBox = () => {
        setCheckBox(!checkBox);
        console.log(checkBox);
    }

    const handleSave = async () => {
        if(checkBox){
            setOpenSnackbarTerms(false)
            if(emailRegex.test(email)){
                const data = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    currentPassword: currentPassword
                }
    
                console.log(data);
                try {
                    const response = await auth.register();
                    console.log(response)
                } catch (error) {
                    console.error(error)
                }
            } else {
                setOpenSnackbarEmail(true)
                setSnackbarMessageEmail('Direccion de correo Invalida')
            }
        }else{
            setOpenSnackbarTerms(true)
            setSnackbarMessageTerms("Debes aceptar terminos y condiciones")
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
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={documentTypeOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Selecciona una opción" />}
                        />
                        <Button onClick={handleSetOpenTerms}>Acepto Terminos y condiciones</Button>
                        <div className='auth-form_row'>
                            <div className='auth-form-modal'>
                                <Modal
                                
                                open={terms}
                                onClose={handleSetCloseTerms}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                >
                                <Box sx={{ ... style, width: 900 }}>
                                    <h2 id="parent-modal-title">Terminos y Condiciones</h2>
                                    <p id="parent-modal-description">
                                    Por favor, lee detenidamente los siguientes términos y condiciones antes de utilizar nuestro sitio web. Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguno de los siguientes puntos, te recomendamos que no utilices nuestro sitio web. <br/>

                                    1. Uso del Sitio Web <br/>

                                    1.1. <br/>

                                    El contenido de este sitio web es únicamente para información general y puede estar sujeto a cambios sin previo aviso. No garantizamos la exactitud, integridad o actualidad de la información proporcionada en este sitio web. <br/>

                                    1.2. <br/>

                                    El uso de cualquier información o material en este sitio web es bajo tu propio riesgo. Es tu responsabilidad asegurarte de que cualquier producto, servicio o información disponible a través de este sitio web cumpla con tus requisitos específicos. <br/>

                                    1.3. <br/>

                                    Este sitio web puede contener enlaces a otros sitios web que no están bajo nuestro control. No tenemos control sobre la naturaleza, el contenido y la disponibilidad de esos sitios. La inclusión de cualquier enlace no implica necesariamente una recomendación o respaldo de los puntos de vista expresados en ellos. <br/>

                                    2. Propiedad Intelectual <br/>

                                    2.1. <br/>

                                    Todos los derechos de propiedad intelectual en relación con este sitio web y su contenido (incluyendo, pero no limitado a, texto, gráficos, logotipos, imágenes y software) son propiedad de SENNOVALAB o de nuestros licenciantes. Estos están protegidos por las leyes de propiedad intelectual aplicables. <br/>

                                    2.2. <br/>

                                    Está prohibida cualquier reproducción, distribución, modificación o uso no autorizado del contenido de este sitio web sin nuestro consentimiento previo por escrito. <br/>

                                    3. Privacidad y Protección de Datos <br/>

                                    3.1. <br/>

                                    La recopilación y el uso de tus datos personales en relación con este sitio web están sujetos a nuestra Política de Privacidad. Al utilizar nuestro sitio web, aceptas el procesamiento de tus datos personales de acuerdo con nuestra Política de Privacidad. <br/>

                                    4. Limitación de Responsabilidad <br/>

                                    4.1. <br/>

                                    En la medida permitida por la ley aplicable, excluimos todas las garantías y condiciones relacionadas con nuestro sitio web y su contenido. No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso de este sitio web. <br/>

                                    5. Modificaciones de los Términos y Condiciones <br/>

                                    5.1. <br/>

                                    Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios serán efectivos tan pronto como se publiquen en este sitio web. Te recomendamos que revises regularmente estos términos y condiciones para estar al tanto de cualquier cambio.
                                    </p>
                                    {/* <ChildModal /> */}
                                    <FormControlLabel onChange={handleSetCheckBox} required control={<Checkbox />} label="Aceptar" />
                                    <Button onClick={handleSetCloseTerms}>Salir</Button>
                                </Box>
                                
                                </Modal>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </form>
                <button onClick={handleSave}>ENVIAR</button>
            </div>
            <Snackbar
                open={openSnackbarTerms}
            >
                <MuiAlert onClose={() => setOpenSnackbarTerms(false)} severity="error">
                    {snackbarMessageTerms}
                </MuiAlert>
            </Snackbar>

            <Snackbar
                open={openSnackbar}
            >
                <MuiAlert onClose={() => setOpenSnackbar(false)} severity="error">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            <Snackbar
                open={openSnackbarEmail}
            >
                <MuiAlert onClose={() => setOpenSnackbarEmail(false)} severity="error">
                    {snackbarMessageEmail}
                </MuiAlert>
            </Snackbar>
        </>
    );
}

export default SignUp;
