import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { Auth } from "../../api";
import { Button } from "@mui/material";

function Navbar() {
	const navigate = useNavigate();
	const auth = new Auth();
	const navRef = useRef();
	const [refresh, setRefresh] = useState(false); // Estado de actualización

	const logOut = () => {
		localStorage.removeItem("access");
		setRefresh(!refresh); // Cambia el estado para forzar una actualización
		navigate("/");
	}

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
		<nav ref={navRef}>
			{auth.getAccessToken() !== null ? (
				<Button onClick={logOut} style={{backgroundColor:"black"}}>Cerrar sesión</Button>
			) : (
			<>
				<Link to="/login">Ingresar</Link>
				<Link to="/signup">Registrarse</Link>
			</>
			)}
			<button className="nav-btn nav-close-btn" onClick={showNavbar}>
			<FaTimes />
			</button>
		</nav>
		<button className="nav-btn" onClick={showNavbar}>
			<FaBars />
		</button>
		</header>
	);
}

export default Navbar;
