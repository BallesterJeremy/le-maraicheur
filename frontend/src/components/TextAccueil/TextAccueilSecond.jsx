import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import vegetables from "@assets/pictures/IMG_0349.webp";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

export default function TextAccueilSecond() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "auto",
    backdropFilter: "blur(30px)",
    transform: "translate(-50%, -50%)",
    width: "90%",
    borderRadius: "8px",
    background: "rgba( 255, 255, 255, 0.2 )",
    boxShadow: "0 8px 32px 0 rgba(253, 253, 253, 0.37)",
  };
  const [textHome, setTextHome] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}text?page=home&textSection=2`)
        .then((response) => response.data);
      setTextHome(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("text doesn't exists");
      }
    }
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <div className="textHome2">
      <img className="boxGlass" src={vegetables} alt="jardin" />
      {textHome.map((text) => (
        <section key={text.id}>
          <div className="body2">
            <p key={text.id}>{parse(text.body)}</p>
            <button type="button" className="buttonPanier" onClick={handleOpen}>
              <p>Plus de détails</p>
            </button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CloseIcon
                onClick={handleClose}
                style={{
                  color: "white",
                  float: "right",
                  marginRight: "5px",
                  marginTop: "5px",
                  cursor: "pointer",
                }}
              />
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                {parse(text.title)}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "white",
                  textAlign: "center",
                  marginTop: "3em",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              >
                {parse(text.body)}
              </Typography>
              <div className="button-modal-container">
                <Link to="/amap">
                  <button
                    type="button"
                    className="modal-button-preorder"
                    style={{ marginTop: "3em" }}
                  >
                    {" "}
                    JE COMMANDE{" "}
                  </button>
                </Link>
              </div>
            </Box>
          </Modal>
        </section>
      ))}
    </div>
  );
}
