import React, { useEffect, useState } from 'react';
import { Auth } from "../../../api/index";
import { Department } from '../../../api/department';
import { InputLabel, FormControl, Autocomplete, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Modal, OutlinedInput, TextField, CardContent, Grid, Fab, Avatar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    /* Regex for e-mail */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook.com|icloud.com|aol.com|protonmail.com|zoho.com)$/;
    /* new Instance of Auth */
    const auth = new Auth();
    const dep = new Department();

    // User
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentpassword] = useState("");
    const [avatar, setAvatar] = useState(null)

    // Address
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedMun, setSelectedMun] = useState(null);
    const [nomenclature, setNomenclature] = useState("");

    // Data for form
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [departments, setDepartments] = useState([])
    const [municipalities, setMunicipalities] = useState([])

    // Errors and selects
    const [terms, setTerms] = useState(false);
    const [checkBox, setCheckBox] = useState(false);
    const [departmentsLoaded, setDepartmentsLoaded] = useState(false);

    //SnackBars
    const [openSnackbarName, setOpenSnackbarName] = useState(false);
    const [openSnackbarNomenclature, setOpenSnackbarNomenclature] = useState(false);
    const [openSnackbarLastname, setOpenSnackbarLastname] = useState(false);
    const [openSnackbarPassword, setOpenSnackbarPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openSnackbarTerms, setOpenSnackbarTerms] = useState(false);
    const [snackbarMessageTerms, setSnackbarMessageTerms] = useState("");
    const [openSnackbarEmail, setOpenSnackbarEmail] = useState(false);
    const [snackbarMessageEmail, setSnackbarMessageEmail] = useState("");
    const [openSnackbarDept, setOpenSnackbarDept] = useState(false);
    const [openSnackbarMun, setOpenSnackbarMun] = useState(false);

    // Se ejecuta una vez cuando se carga el componente
    useEffect(() => {
        if (!departmentsLoaded) {
            handleDepartments();
            setDepartmentsLoaded(true);
        }
    }, [departmentsLoaded]);

    const handleDepartments = async () => {
        try {
            const response = await dep.getDepartments();
            const data = JSON.parse(response);
            let departamentos = []

            data.forEach(function (item) {
                departamentos.push(item.department);
            });
            
            setDepartments(departamentos)
        } catch (error) {
            console.error(error)
        }
    }

    /* UserData */
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

    const handleSave = async () => {
        if (checkBox) {
            setOpenSnackbarTerms(false);
    
            // Verifica si los campos de nombre, apellido, contraseña, departamento, municipio y nomenclatura no están vacíos
            if (firstname === "") {
                setOpenSnackbarName(true); // Muestra un Snackbar si el campo de nombre está vacío
                return;
            }
    
            if (lastname === "") {
                setOpenSnackbarLastname(true); // Muestra un Snackbar si el campo de apellido está vacío
                return;
            }
    
            if (currentPassword === "") {
                setOpenSnackbarPassword(true); // Muestra un Snackbar si el campo de contraseña está vacío
                return;
            }
    
            if (selectedDepartment === null) {
                setOpenSnackbarDept(true); // Muestra un Snackbar si el departamento no se ha seleccionado
                return;
            }
    
            if (selectedMun === null) {
                setOpenSnackbarMun(true); // Muestra un Snackbar si el municipio no se ha seleccionado
                return;
            }
    
            if (nomenclature === "") {
                setOpenSnackbarNomenclature(true); // Muestra un Snackbar si el campo de nomenclatura está vacío
                return;
            }
    
            if (emailRegex.test(email)) {
                // Validación de contraseñas
                if (currentPassword !== confirmPassword) {
                    setOpenSnackbar(true);
                    setSnackbarMessage("Las contraseñas no coinciden");
                } else {
                    setOpenSnackbar(false);
                    setSnackbarMessage("");
    
                    try {
                        const addr = await handleSaveAddress();
                        const data = {
                            name: firstname,
                            lastname: lastname,
                            email: email,
                            password: currentPassword,
                            address: addr
                        }
    
                        try {
                            const response = await auth.register(data);
                            console.log(response)
                            if(response === 'Usuario creado con éxito'){
                                navigate("/login");
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            } else {
                setOpenSnackbarEmail(true);
                setSnackbarMessageEmail('Dirección de correo inválida');
            }
        } else {
            setOpenSnackbarTerms(true);
            setSnackbarMessageTerms("Debes aceptar términos y condiciones");
        }
    }
       

    /* Address Data */
    const handleSetNomenclature = (event) => {
        setNomenclature(event.target.value);
    }

    const handleDepartmentChange = async (event, value) => {
        if (value === null) {
            setMunicipalities([{ label: "Selecciona un departamento", value: null }]);
            setSelectedDepartment(null);
        } else {
            const response = await dep.getDepartments();
            const data = JSON.parse(response);
            var departamento = data.find(function(item) {
                return item.department.value === value.value;
            });
            const municipalities = []
            if(departamento){
                departamento.municipios.map(function(municipio) {
                    municipalities.push(municipio);
                })
            }else{
                setMunicipalities([{ label: "El departamento no Existe", value: null }]);
                setSelectedDepartment(null);
            }
            setSelectedDepartment(value.value);
            setMunicipalities(municipalities);
        }
    }

    const handleMunChange = (event, value) => {
        if (value === null) {
            setSelectedMun(null);
            setMunicipalities([{ label: "Selecciona un municipio", value: null }]);
        } else {
            setSelectedMun(value.value);
        }
    }

    const handleSaveAddress = async () => {
        const data = {
            country: "Colombia",
            department: selectedDepartment,
            state: selectedMun,
            nomclature: nomenclature
        }

        // Luego procedemos con el registro
        try {
            const response = await dep.createAddress(data);
            
            return response
        } catch (error) {
            console.error(error);
        }
    }

    /* Terms, checks and events */
    const handleSetOpenTerms = () => {
        setTerms(true)
    }

    const handleSetCloseTerms = () => {
        setTerms(false)
    }

    const handleSetCheckBox = () => {
        setCheckBox(!checkBox);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUploadClick = (event) => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
    
        reader.onloadend = function(e) {
            setAvatar([reader.result])
        }.bind(this);
        console.log(url); // Would see a path?
    };

    // Componente personalizado para el Snackbar
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div className='main-container'>
            <h1 style={{color:"black"}}>Registrarse</h1>
            <div className='auth-container'>
                <form className='auth-form'>
                    <Avatar>
                        <Grid container justify="center" alignItems="center">
                            <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleUploadClick}
                            />
                        </Grid>
                    </Avatar>

                    <div className='auth-form_row'>
                        <TextField
                            id="firstname"
                            label="Nombre"
                            variant="outlined"
                            value={firstname}
                            className="input-auth-form"
                            sx={{ width: "50%"}}
                            onChange={handleSetFirstname}
                        />
                        <TextField
                            id="lastname"
                            label="Apellido"
                            variant="outlined"
                            value={lastname}
                            sx={{ width: "50%" }}
                            className="input-auth-form"
                            onChange={handleSetLastname}
                        />
                    </div>

                    <div className='auth-form_row'>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            sx={{ width: "100%" }}
                            className="input-auth-form"
                            onChange={handleSetEmail}
                        />
                    </div>

                    <div className='auth-form_row'>
                        <FormControl sx={{ width: "50%" }}>
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
                        <FormControl sx={{ width: "50%" }}>
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

                    <div className='auth-form_row'>
                        <div className='autocomplete-container'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo dep"
                                options={departments}
                                sx={{ width: "50%" }}
                                renderInput={(params) => <TextField {...params} label="Departamento" />}
                                onChange={handleDepartmentChange}
                            />

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo mun"
                                options={municipalities}
                                sx={{ width: "50%" }}
                                renderInput={(params) => <TextField {...params} label="Municipio" />}
                                onChange={handleMunChange}
                            />
                        </div>
                    </div>

                    <div className='auth-form_row'>
                        <TextField
                            id="nomenclature"
                            label="Nomenclatura"
                            variant="outlined"
                            value={nomenclature}
                            sx={{ width: "100%" }}
                            className="input-auth-form"
                            onChange={handleSetNomenclature}
                        />
                    </div>

                    <Button onClick={handleSetOpenTerms} 
                        sx={{
                            marginY:1
                        }}
                    >
                        Acepto Terminos y condiciones
                    </Button> 
                        
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
                </form>

                <Button 
                    variant="contained" 
                    color="success"
                    onClick={handleSave}
                    sx={{
                        marginBottom:5
                    }}
                >
                    Registrarse
                </Button>
                
            </div>

            {/* SnackBars */}

            <Snackbar open={openSnackbarTerms} autoHideDuration={3000} onClose={() => setOpenSnackbarTerms(false)}>
                <MuiAlert severity="error">
                    {snackbarMessageTerms}
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <MuiAlert severity="error">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbarEmail} autoHideDuration={3000} onClose={() => setOpenSnackbarEmail(false)}>
                <MuiAlert severity="error">
                    {snackbarMessageEmail}
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbarName} autoHideDuration={3000} onClose={() => setOpenSnackbarName(false)}>
                <MuiAlert severity="error">
                    El campo de nombre no puede estar vacío.
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbarLastname} autoHideDuration={3000} onClose={() => setOpenSnackbarLastname(false)}>
                <MuiAlert severity="error">
                    El campo de apellido no puede estar vacío.
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbarPassword} autoHideDuration={3000} onClose={() => setOpenSnackbarPassword(false)}>
                <MuiAlert severity="error">
                    El campo de contraseña no puede estar vacío.
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbarDept} autoHideDuration={3000} onClose={() => setOpenSnackbarDept(false)}>
                <MuiAlert severity="error">
                    Debes seleccionar un departamento.
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbarMun} autoHideDuration={3000} onClose={() => setOpenSnackbarMun(false)}>
                <MuiAlert severity="error">
                    Debes seleccionar un municipio.
                </MuiAlert>
            </Snackbar>

            <Snackbar open={openSnackbarNomenclature} autoHideDuration={3000} onClose={() => setOpenSnackbarNomenclature(false)}>
                <MuiAlert severity="error">
                    El campo de nomenclatura no puede estar vacío.
                </MuiAlert>
            </Snackbar>

        </div>
    );
}

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

export default SignUp;
