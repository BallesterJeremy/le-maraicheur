/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import logo1 from "@assets/pictures/logo1.webp";
import logo2 from "@assets/pictures/logo2.webp";
import house from "@assets/pictures/barn.webp";
import produit from "@assets/pictures/radish.webp";
import methode from "@assets/pictures/plantadmin.webp";
import propos from "@assets/pictures/people.webp";
import contact from "@assets/pictures/email.webp";
import { NavLink } from "react-router-dom";
import burgerlogo from "../assets/pictures/crate.webp";
import close from "../assets/pictures/close.webp";

export default function MenuBurger() {
  const [showBurger, setShowBurger] = useState(false);
  const [crateVisible, setCrateVisible] = useState(burgerlogo);

  const toggleBurger = () => {
    setShowBurger(true);
    setCrateVisible(close);

    if (setShowBurger === true) {
      setShowBurger(false);
    } else if (crateVisible === close) {
      setCrateVisible(burgerlogo);
      setShowBurger(false);
    }
  };

  const Burger = (props) => {
    return (
      <div className={`burgerslide ${props.show ? "active" : ""}`}>
        {props.children}
      </div>
    );
  };
  const BurgerBody = (props) => {
    return <div className="modal__body ">{props.children}</div>;
  };

  return (
    <nav>
      <div className="mobile-container">
        <div className="mobile-logo--position">
          <NavLink to="/">
            <img
              src={logo2}
              alt="Logo du Maraîcheur"
              className="mobile-mode--logosize"
            />
          </NavLink>
        </div>
        <div className="mobile-burgerlogo--position">
          <img
            src={crateVisible}
            alt="Menu burger"
            className="mobile-burgerlogo--size"
            onClick={toggleBurger}
          />
        </div>
      </div>
      <div className="slider-mobile">
        <Burger show={showBurger}>
          <BurgerBody>
            <div className="slide-logo--position">
              <img
                src={logo1}
                alt="Logo Maraîcheur"
                className="slide-logo--size"
              />
            </div>
            <ul className="ul-burger">
              <div>
                <li>
                  <NavLink
                    to="/"
                    className={(nav) =>
                      nav.isActive ? "burgerslide-active" : undefined
                    }
                  >
                    <div className="mobile-icon-container">
                      <img
                        src={house}
                        alt="Icône home"
                        className="mobile-icon--size"
                      />
                      <p>Accueil</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/methode"
                    className={(nav) =>
                      nav.isActive ? "burgerslide-active" : undefined
                    }
                  >
                    <div className="mobile-icon-container">
                      <img
                        src={methode}
                        alt="Icône méthode"
                        className="mobile-icon--size"
                      />
                      <p>La Méthode</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/produit"
                    className={(nav) =>
                      nav.isActive ? "burgerslide-active" : undefined
                    }
                  >
                    <div className="mobile-icon-container">
                      <img
                        src={produit}
                        alt="Icône produits"
                        className="mobile-icon--size"
                      />
                      <p>Nos produits</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/propos"
                    className={(nav) =>
                      nav.isActive ? "burgerslide-active" : undefined
                    }
                  >
                    <div className="mobile-icon-container">
                      <img
                        src={propos}
                        alt="Icône à propos"
                        className="mobile-icon--size"
                      />
                      <p>À propos</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={(nav) =>
                      nav.isActive ? "burgerslide-active" : undefined
                    }
                  >
                    <div className="mobile-icon-container">
                      <img
                        src={contact}
                        alt="Icône home"
                        className="mobile-icon--size"
                      />
                      <p>Contact</p>
                    </div>
                  </NavLink>
                </li>
              </div>
              <div className="footerImg2">
                <NavLink to="/" className="footerLink2">
                  <img
                    className="socials2"
                    src="src/assets/pictures/social-network.png"
                    alt="Facebook icon"
                  />
                </NavLink>
                <NavLink to="/" className="footerLink2">
                  <img
                    className="socials2"
                    src="src/assets/pictures/instagram.png"
                    alt="instagram icon"
                  />
                </NavLink>
              </div>
            </ul>
            <p className="footerDroits2"> © 2022, TOUTS DROITS RÉSERVÉS</p>
          </BurgerBody>
        </Burger>
      </div>
    </nav>
  );
}
