/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */

import "@components/ContactForm.css";
import axios from "axios";
import MenuBurger from "@components/MenuBurger";
import Preorder from "@components/Preorder";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import logo3 from "@assets/pictures/logo3.png";
import ReCAPTCHA from "react-google-recaptcha";

import { useState } from "react";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [textMail, setTextMail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setVerified(true);
  };

  const postEmail = async (e) => {
    e.preventDefault();
    try {
      const postData = { email, textMail, name, surname };
      // eslint-disable-next-line no-unused-vars
      const newPost = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}emails/contactForm`,
        postData
      );
      setVerified(true);
      return alert(
        "Le mail a bien été envoyé !",
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Helmet>
        <meta
          charSet="utf-8"
          name="content"
          content="Antoine Debray, Le Maraicheur maraicher situé à La Croix-du-Perche"
        />
        <title>Contact - Le Maraicheur </title>
        <link href="http://lemaraicheur.com/contact" />
      </Helmet>
      <Navbar />
      <MenuBurger />
      <h1 className="titre-contact">Nous contacter</h1>
      <hr className="hr-contact"></hr>
      <div className="wrapper">
        <section className="container-form-grid">
          <div className="form-contact">
            <form
              onSubmit={postEmail}
              name="contact"
              method="post"
              className="contact_form"
            >
              <img
                className="logo-maraicheur"
                src="./src/assets/pictures/logo2.webp"
              />
              <div className="logo-mobile">
                <img className="logo-maraicheur2" src={logo3} />
              </div>
              <h3 className="info-contact">Informations personnelles : </h3>
              <div className="name-contact">
                <label className="contact-label">
                  Prénom*{" "}
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="nom-prenom"
                    type="text"
                    name="prénom"
                    placeholder="Prénom"
                  />
                </label>

                <label className="contact-label">
                  Nom*{" "}
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="nom-prenom"
                    type="text"
                    name="nom"
                    placeholder="Nom"
                  />
                </label>
              </div>
              <label className="email-label">
                Email*{" "}
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email"
                  type="email"
                  name="email"
                  placeholder="monemail@gmail.com"
                />
              </label>

              <label className="message-contact">
                Message*{" "}
                <textarea
                  value={textMail}
                  onChange={(e) => setTextMail(e.target.value)}
                  rows="10"
                  cols="50"
                  placeholder="Saisissez votre message ici..."
                ></textarea>
              </label>
              <div className="container-button-contact">
                <ReCAPTCHA
                  style={{ marginTop: 20 }}
                  sitekey="6Lcv1_0gAAAAAGFIJMCtmoB62_PXuLLrOSc9KSOm"
                  onChange={onSubmit}
                />
                <button
                  // disabled={!verified}
                  className="button-contact"
                  type="submit"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
          <div className="img-contact">
            <img
              className="image-contact"
              src="./src/assets/pictures/Contact.jpeg"
              alt="image-antoine"
            ></img>
          </div>
        </section>
      </div>
      <h1 className="titre-contact">Précommander un panier</h1>
      <hr className="hr-contact"></hr>
      <div className="container-preorder">
        <Preorder />
      </div>
      <div className="map-contact">
        <iframe
          title="test"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10618.375323424!2d1.001514!3d48.29142945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e39707873d3e91%3A0xfdbfc22c3c91e249!2sLe%20Mara%C3%AEcheur!5e0!3m2!1sfr!2sfr!4v1657180505570!5m2!1sfr!2sfr"
          width="1000"
          height="650"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
