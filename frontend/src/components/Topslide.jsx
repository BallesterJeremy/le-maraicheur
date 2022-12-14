/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import settings from "../assets/pictures/paramètres.png";
import hover from "../assets/pictures/equipement.png";

const Topslide = () => {
  const menu = [
    "Page d'accueil",
    "La Méthode",
    "Nos Produits",
    "À Propos",
    "Clients",
  ];
  const location = useLocation();
  const [onHover, setOnHover] = useState(settings);
  const [showModal, setShowModal] = useState(false);
  const Modal = (props) => {
    return (
      <div className={`modal ${props.show ? "active" : ""}`}>
        {props.children}
      </div>
    );
  };
  const ModalBody = (props) => {
    return <div className="modal__body ">{props.children}</div>;
  };
  const ModalFooter = (props) => {
    return <div className="modal__footer ">{props.children}</div>;
  };

  return (
    <section className="top-pannel-position">
      <div className="top-pannel">
        <div className="title-style">
          <h1>Menu Administrateur / </h1>
          <span className="animation-title--topslide">
            {location.pathname === "/admin/log" ? menu[0] : null}
            {location.pathname === "/admin/methode" ? menu[1] : null}
            {location.pathname === "/admin/produit" ? menu[2] : null}
            {location.pathname === "/admin/apropos" ? menu[3] : null}
            {location.pathname === "/admin/client" ? menu[4] : null}
          </span>
        </div>
        <div className="position-settings">
          <img
            src={onHover}
            onMouseOver={() => setOnHover(hover)}
            onMouseOut={() => setOnHover(settings)}
            alt="Icône de paramètres"
            className="settings-size"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <Modal show={showModal}>
        <ModalBody>
          <h2 className="title-modal-admin">OPTIONS ADMINISTRATEUR</h2>
          <button className="button-modal-admin-1">
            <NavLink to="/admin">SE DECONNECTER DE L'ADMINISTRATION</NavLink>
          </button>
          <br />
          <br />
          <br />
          <button className="button-modal-admin-2">
            <NavLink to="/reset">CHANGER MON MOT DE PASSE</NavLink>
          </button>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => setShowModal(false)} className="modal-btn">
            X
          </button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

export default Topslide;
