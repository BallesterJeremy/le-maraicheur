import { useState, useEffect } from "react";
import axios from "axios";
import "./textAccueil.css";

export default function TextAccueil() {
  const [textHome, setTextHome] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}text?page=home&textSection=1`)
        .then((response) => response.data);
      setTextHome(data);
      // console.log(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-line
        alert("text doesn't exists");
      }
    }
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <div>
      {textHome.map((text) => (
        <div key={text.id}>
          <p key="body1">{text.body}</p>
        </div>
      ))}
    </div>
  );
}