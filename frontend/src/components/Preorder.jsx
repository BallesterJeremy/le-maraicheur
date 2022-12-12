import axios from "@services/axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import SuccesPreorder from "./SuccesPreorder";
// import WarningPreorder from "./WarningPreorder";

export default function ClientList() {
  const [clientList, setClientList] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [succes, setSucces] = useState(false);
  const [verified, setVerified] = useState(false);

  const onSubmit = () => {
    // console.log("Captcha value:", value);
    setVerified(true);
  };

  const postClient = async () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}preorder`, {
      lastname,
      firstname,
      email,
      paymentMethod,
    });
    setSucces(true);
  };

  return (
    <section className="container-preorder-form">
      {succes ? <SuccesPreorder /> : ""}
      <form className="mep" onSubmit={setClientList}>
        <label htmlFor="firstname">
          Prénom *
          <input
            type="text"
            placeholder="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          Nom *
          <input
            type="text"
            placeholder="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email *
          <input
            type="text"
            placeholder="monemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div className="payment">
          <p>Paiement :</p>
          <select
            className="clientStatus"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Select">Choisir un paiement en: </option>
            <option value="1x">1x</option>
            <option value="3x">3x</option>
            <option value="12x">12x</option>
          </select>
        </div>
        <div
          className="captcha"
          style={{
            transform: "scale(0.85)",
            transformOrigin: "0 0",
            marginTop: 20,
            width: 256,
          }}
        >
          <ReCAPTCHA
            style={{
              display: "flex",
              justifyContent: "center",

              width: "300px",
            }}
            sitekey="6Lcv1_0gAAAAAGFIJMCtmoB62_PXuLLrOSc9KSOm"
            onChange={onSubmit}
          />
        </div>
        <button
          type="button"
          onClick={() => postClient(clientList)}
          disabled={!verified}
        >
          Précommander
        </button>
      </form>
    </section>
  );
}
