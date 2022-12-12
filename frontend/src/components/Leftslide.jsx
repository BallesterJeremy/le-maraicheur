import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../assets/pictures/logo1.webp";
import home from "../assets/pictures/barn.webp";
import method from "../assets/pictures/plantadmin.webp";
import product from "../assets/pictures/radish.webp";
import about from "../assets/pictures/people.webp";
import contact from "../assets/pictures/email.webp";
import news from "../assets/pictures/news-paper.png";
import market from "../assets/pictures/paniershop.png";

export default function LeftSlide() {
  return (
    <section>
      <div className="leftpannel">
        <div className="logo-position-home">
          <NavLink to="/admin/home">
            <img src={logo} alt="" className="logo-size-home" />
          </NavLink>
        </div>
        <nav>
          <NavLink
            to="/admin/home"
            className={(nav) => (nav.isActive ? "nav-admin-active" : undefined)}
          >
            <div className="icon-container">
              <img src={home} alt="icon home" className="icon-home" />
              <p>Accueil</p>
            </div>
          </NavLink>
          <NavLink
            to="/admin/methode"
            className={(nav) => (nav.isActive ? "nav-admin-active" : undefined)}
          >
            <div className="icon-container">
              <img src={method} alt="icon method" className="icon-method" />
              <p>La Méthode</p>
            </div>
          </NavLink>
          <NavLink
            to="/admin/produits"
            className={(nav) => (nav.isActive ? "nav-admin-active" : undefined)}
          >
            <div className="icon-container">
              <img src={product} alt="icon product" className="icon-product" />
              <p>Nos Produits</p>
            </div>
          </NavLink>
          <NavLink
            to="/admin/apropos"
            className={(nav) => (nav.isActive ? "nav-admin-active" : undefined)}
          >
            <div className="icon-container">
              <img src={about} alt="icon about" className="icon-about" />
              <p>À propos</p>
            </div>
          </NavLink>
          <NavLink
            to="/admin/articles"
            className={(nav) => (nav.isActive ? "nav-admin-active" : undefined)}
          >
            <div className="icon-container">
              <img src={news} alt="icon articles" className="icon-contact" />
              <p>Articles</p>
            </div>
          </NavLink>
          <NavLink
            to="/admin/market"
            className={(nav) => (nav.isActive ? "nav-admin-active" : undefined)}
          >
            <div className="icon-container">
              <img src={market} alt="icon market" className="icon-contact" />
              <p>Market</p>
            </div>
          </NavLink>
          <NavLink
            to="/admin/client"
            className={(nav) => (nav.isActive ? "nav-admin-active" : undefined)}
          >
            <div className="icon-container">
              <img src={contact} alt="icon contact" className="icon-contact" />
              <p>Clients</p>
            </div>
          </NavLink>
        </nav>
      </div>
    </section>
  );
}
