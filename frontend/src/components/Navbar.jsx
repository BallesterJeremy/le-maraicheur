import { NavLink } from "react-router-dom";
import logo from "../assets/pictures/logo1.webp";

export default function Navbar() {
  return (
    <nav className="background-nav">
      <div className="logo-nav-position">
        <NavLink to="/">
          <img src={logo} alt="Logo Maraîcheur" className="logo-nav-size" />
        </NavLink>
      </div>
      <div className="nav-position">
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>Accueil</p>
        </NavLink>
        <NavLink
          to="/methode"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>La Méthode</p>
        </NavLink>
        <NavLink
          to="/produit"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>Nos produits</p>
        </NavLink>
        <NavLink
          to="/propos"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>À propos</p>
        </NavLink>
        <NavLink
          to="/contact"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>Contact</p>
        </NavLink>
      </div>
    </nav>
  );
}
