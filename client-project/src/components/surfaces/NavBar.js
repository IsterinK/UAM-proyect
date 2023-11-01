import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Auth } from "../../api";
import { Button } from "@mui/material";
import "./NavBar.scss"

const NavBar = () => {
	const navigate = useNavigate();
	const auth = new Auth();
    const [menuOpen, setMenuOpen] = useState(false);
	const [refresh, setRefresh] = useState(false); // Estado de actualización

	const logOut = () => {
		localStorage.removeItem("access");
		setRefresh(!refresh); // Cambia el estado para forzar una actualización
		navigate("/");
	}

	return (
		<nav>
			<Link to="/" className="title">
				<img src={"https://seeklogo.com/images/D/dragon-ball-goku-logo-7A0B308D2D-seeklogo.com.png"} alt='' className='logo'></img>
			</Link>
			<div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<ul className={menuOpen ? "open" : ""}>
				{auth.getAccessToken() !== null ? (
					<li>
						<Button onClick={logOut} style={{backgroundColor:"black"}}>Cerrar sesión</Button>
					</li>
				) : (
				<>
					<li>
						<Link to="/login">Ingresar</Link>
					</li>
					<li>
						<Link to="/signup">Registrarse</Link>
					</li>
				</>
				)}
				
			</ul>
		</nav>
	)
}

export default NavBar

