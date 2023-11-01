import React, { useEffect, useState, useRef } from 'react';
import { Auth } from "../../../api/index";
import { Department } from '../../../api/department';
import { InputLabel, FormControl, Autocomplete, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Modal, OutlinedInput, TextField, CardContent, Grid, Fab, Avatar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./CreateUser.scss";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ handleCloseModal }) => {
    const navigate = useNavigate();
    /* Regex for e-mail */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook.com|icloud.com|aol.com|protonmail.com|zoho.com)$/;
    /* new Instance of Auth */
    const auth = new Auth();
    const dep = new Department();

    const [selectedImage, setSelectedImage] = useState(null);

    const handleUploadClick = (event) => {
        var file = event.target.files[0];
        setSelectedImage(file)
    };

    // User
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentpassword] = useState("")

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
    const [openSnackbarAvatar, setOpenSnackbarAvatar] = useState(false);
    const [openSnackbarLastname, setOpenSnackbarLastname] = useState(false);
    const [openSnackbarPassword, setOpenSnackbarPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
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

        if (selectedImage === null){
            setOpenSnackbarAvatar(true);
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
                    
                    const formData = new FormData();
                    formData.append("name", firstname);
                    formData.append("lastname", lastname);
                    formData.append("email", email);
                    formData.append("password", currentPassword);
                    formData.append("address", addr);
                    formData.append("avatar", selectedImage);
                    
                    console.log("FormData:");
                    for (const pair of formData.entries()) {
                    console.log(pair[0] + ": " + pair[1]);
                    }

                    try {
                        const response = await auth.register(formData);
                        console.log(response);
                        if (response === 'Usuario creado con éxito') {
                            handleCloseModal();
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Componente personalizado para el Snackbar
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div className='main-container-copy'>
            <h1 style={{color:"black"}}>Crear Usuario</h1>
            <div className='auth-container-copy'>
                <form className='auth-form-copy'>
                <div className='auth-form_row'>
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleUploadClick}
                        style={{ display: 'none' }}
                    />
                    <div className="avatar-button-container">
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="outlined"
                                component="span"
                            >
                                Selecciona un avatar
                            </Button>
                        </label>

                        {selectedImage && (
                            <Avatar
                                alt="Imagen de perfil"
                                src={URL.createObjectURL(selectedImage)}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    marginLeft:5,
                                    border: '3px solid #CCC'
                                }}
                            />
                        )}
                    </div>
                </div>
                
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
                        
                </form>

                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handleSave}
                    sx={{
                        margin:2,
                    }}
                >
                    Registrarse
                </Button>
                
            </div>

            {/* SnackBars */}

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

            <Snackbar open={openSnackbarAvatar} autoHideDuration={3000} onClose={() => setOpenSnackbarAvatar(false)}>
                <MuiAlert severity="error">
                    Debes seleccionar un avatar
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

export default CreateUser;
