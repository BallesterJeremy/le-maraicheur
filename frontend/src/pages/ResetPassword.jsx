/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "@services/axios";
import * as yup from "yup";
import AlertError from "@components/AlertError";
import logo from "../assets/pictures/logo1.png";
import eyesHidden from "../assets/pictures/invisible.png";
import eyesUnhidden from "../assets/pictures/yeux.png";

// password must contain almost one upper case, one lower case, a number and a special character contained in [!@#$%^&*], and have 8 to 32 characters
const schemaForResetPassword = yup.object().shape({
  temporaryPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Temporary Password must contain almost one upper case, one lower case, one number and a special character contained in [!@#$%^&*]"
    )
    .min(8, "Temporary Password must be almost 8 characters")
    .max(32, "Temporary Password must be max 32 characters")
    .required("Temporary Password is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain almost one upper case, one lower case, one number and a special character contained in [!@#$%^&*]"
    )
    .min(8, "Password must be almost 8 characters")
    .max(32, "Password must be max 32 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Confirm Password must contain almost one upper case, one lower case, one number and a special character contained in [!@#$%^&*]"
    )
    .min(8, "Confirm Password and Password must be almost 8 characters")
    .max(32, "Confirm Password and Password must be max 32 characters")
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Password and Confirm Password must match"),
  email: yup
    .string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
});

export default function ResetPassword() {
  const [error, setError] = useState(false);
  const [eyesVisible, setEyesVisible] = useState(eyesHidden);
  const [eyesStyle, setEyesStyle] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const [admData, setAdmData] = useState({
    email: "",
    password: "",
    temporaryPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setAdmData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setEyesStyle(!eyesStyle);

    if (eyesVisible === eyesHidden) {
      setEyesVisible(eyesUnhidden);
    } else if (eyesVisible === eyesUnhidden) {
      setEyesVisible(eyesHidden);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schemaForResetPassword.validate(admData);

      await axios.post(
        "adm/reset-password",
        {
          email: admData.email,
          password: admData.password,
          temporaryPassword: admData.temporaryPassword,
        },
        {
          withCredentials: true,
        }
      );

      setAdmData({
        email: "",
        password: "",
        temporaryPassword: "",
        confirmPassword: "",
      });

      navigate("/admin");
    } catch (err) {
      if (err) {
        setError(true);
      }
    }
  };

  return (
    <section className="background">
      {error ? <AlertError /> : ""}
      <div className="container">
        <div className="logo-position">
          <NavLink to="/admin">
            <img
              src={logo}
              alt="Logo du Maraîcheur"
              className="logo-property"
            />
          </NavLink>
        </div>
        <div className="introduction">
          <h1>SAP Santé - Mot de passe oublié</h1>
          <p>
            Vous avez oublié votre mot de passe ? Pas de soucis! Veuillez
            simplement remplir les champs suivants.
          </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:{" "}
            <input
              className="login-input"
              id="email"
              placeholder="monemail@gmail.com"
              type="email"
              value={admData.email}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="temporaryPassword">
            Mot de passe temporaire:{" "}
            <input
              className="login-input"
              id="temporaryPassword"
              placeholder="Saisissez ici votre mot de passe temporaire"
              type={passwordShown ? "text" : "password"}
              value={admData.temporaryPassword}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="password">
            Votre nouveau mot de passe:{" "}
            <input
              className="login-input"
              id="password"
              placeholder="Saisissez ici votre nouveau mot de passe"
              type={passwordShown ? "text" : "password"}
              value={admData.password}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirmer votre nouveau mot de passe:{" "}
            <input
              className="login-input"
              id="confirmPassword"
              placeholder="Saisissez à nouveau votre mot de passe "
              type={passwordShown ? "text" : "password"}
              value={admData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePassword}
              className={eyesStyle ? "eyes-btn2" : "eyes-btn-red2"}
            >
              <img
                src={eyesVisible}
                alt="Oeil pour voir le mot de passe"
                className="eyesforpassword"
              />
            </button>
          </label>
          <button className="login-btn" type="submit">
            CHANGER DE MOT DE PASSE
          </button>
        </form>
      </div>
    </section>
  );
}
