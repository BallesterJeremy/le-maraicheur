/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-restricted-globals */
/* eslint-disable */
import MenuBurger from "@components/MenuBurger";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { Box, Grid, Typography, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Produit() {
  const [products, setProducts] = useState([]);
  const [textModal, setTextModal] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getProducts = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/product/visible`)
        .then((response) => response.data);
      setProducts(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}text?page=home&textSection=2`)
        .then((response) => response.data);
      setTextModal(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("text doesn't exists");
      }
    }
  };

  useEffect(() => {
    getProducts();
    getText();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "auto",
    backdropFilter: "blur(30px)",
    transform: "translate(-50%, -50%)",
    width: "90%",
    borderRadius: "8px",
    marginBottom: "150px",
    background: "rgba( 255, 255, 255, 0.2 )",
    boxShadow: "0 8px 32px 0 rgba(253, 253, 253, 0.37)",
  };

  return (
    <section>
      <Helmet>
        <meta
          charSet="utf-8"
          name="content"
          content="Antoine Debray, Le Maraicheur maraicher situé à La Croix-du-Perche"
        />
        <title>Produits - Le Maraicheur </title>
        <link href="http://lemaraicheur.com/produit" />
      </Helmet>
      <Navbar />
      <MenuBurger />
      <h1 className="titre-product">NOS PRODUITS</h1>
      <hr className="product-hr"></hr>
      <div className="products-picto">
        <Box
          sx={{
            alignItems: "center",
            flexGrow: 1,
            width: "45%",
            marginLeft: "0px",
          }}
        >
          <Grid
            container
            spacing={{ xs: 8, md: 8 }}
            columns={{ xs: 4, sm: 4, md: 8 }}
          >
            {products.length === 0 ? (
              <Grid xs={12} sm={12} md={12} item={true} sx={{ margin: 0 }}>
                <p className="nothing-display">
                  La boutique est fermée pour le moment ! revenez plus tard !
                </p>
              </Grid>
            ) : (
              products.map((items) => (
                <Grid
                  xs={4}
                  sm={4}
                  md={4}
                  item={true}
                  sx={{ margin: 0 }}
                  key={items.id}
                >
                  {items.title !== "LE PANIER" ? (
                    <a
                      className="product-image "
                      id="legume"
                      to={items.link}
                      target="_blank"
                    >
                      <img
                        className="imageprod1"
                        src={`${import.meta.env.VITE_IMAGES_URL}${items.image}`}
                        alt={items.alt}
                      />
                      <p className="legume-product">{items.title}</p>
                      <span className="spanLine" />
                    </a>
                  ) : (
                    textModal.map((text) => (
                      <>
                        <div key={text.id} className="product-image">
                          <img
                            className="imageprod1"
                            src={`${import.meta.env.VITE_IMAGES_URL}${
                              items.image
                            }`}
                            alt={items.alt}
                            onClick={handleOpen}
                          />
                          <p className="legume-product" onClick={handleOpen}>
                            {items.title}
                          </p>
                          <span className="spanLine" />
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
                      </>
                    ))
                  )}
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </div>
      <Footer />
    </section>
  );
}
