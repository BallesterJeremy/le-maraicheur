/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-unresolved
import axios from "@services/axios";
import { useState, useEffect } from "react";
import "../App.css";

export default function MarketPost() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileCreated, setFileCreated] = useState();
  const [picDescript, setPicDescript] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [productsGet, setProductsGet] = useState([]);
  const [visible, setVisible] = useState(0);
  const [idProd, setIdProd] = useState("");

  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      return alert("Select a file with the format jpeg or png");
    }
    return setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    if (!selectedFile) {
      return alert("Provide a picture to add");
    }

    const dataProd = {
      productTitle,
      productLink,
      picDescript,
    };

    if (!productTitle || !productLink || !picDescript) {
      return alert("Provide all the fields before submitting a new product");
    }

    formData.append("pictureData", JSON.stringify(dataProd));

    try {
      const { data } = await axios.post("product/upload", formData);
      setProductImage([]);
      setFileCreated(data);
      return alert(
        "Produit ajouter !",
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      );
    } catch (err) {
      return alert("Une erreur s'est produite lors de l'ajout");
    }
  };

  const getProducts = async () => {
    try {
      const data = await axios.get("product").then((res) => res.data);
      setIdProd(data.id);
      setProductsGet(data);
    } catch (err) {
      console.error(err);
    }
  };

  const visibleProduct = async () => {
    const id = selectedFile;
    if (
      confirm(
        "Êtes vous sûr de vouloir soumettre ces modifications? \nCliquer sur OK pour confirmer ou annuler."
      )
    )
      try {
        const data = await axios
          .put(`product/${id}`, {
            id,
            visible: parseInt(visible, 10),
          })
          .then((res) => res.data);
        setVisible(data);
        return alert(
          "Produit mis a jour !",
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      } catch (err) {
        console.error(err);
      }
  };

  const deleteProduct = async () => {
    const id = selectedFile;
    if (
      confirm(
        "Êtes vous sûr de vouloir soumettre ces modifications? \nCliquer sur OK pour confirmer ou annuler."
      )
    )
      try {
        const data = await axios.delete(`product/${id}`, {
          id,
        });
        return alert(
          `Produit numero ${id} supprimer !`,
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="market-container">
      <form className="upload-container-market" onSubmit={handleSubmit}>
        <label htmlFor="upload-picture">
          Choisir un fichier :
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleInput}
          />
        </label>
        <label htmlFor="picture-title">
          Titre du produit :
          <input
            type="text"
            placeholder="Huiles, Legumes, Bieres..."
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
        </label>
        <label htmlFor="picture-link">
          Lien vers le page E-commerce :
          <input
            type="text"
            placeholder="Lien e-commerce du produit"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
          />
        </label>
        <label htmlFor="picture-description">
          Description de l'image :
          <input
            type="text"
            placeholder="Description de l'image"
            value={picDescript}
            onChange={(e) => setPicDescript(e.target.value)}
          />
        </label>
        <button type="submit">Ajouter un produit</button>
      </form>
      <div className="update-sup-container">
        <div className="update-products">
          <p className="update-text"> Mettre à jour un produit :</p>
          <select
            className="update-selector"
            name="produits"
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            <option value="select">Selectionner un produit</option>
            {productsGet.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.title}
              </option>
            ))}
          </select>
          <p className="update-text">Produit visible ou masquer ?</p>
          <select
            className="update-selector"
            name="visible"
            onChange={(e) => setVisible(e.target.value)}
          >
            <option> Status</option>
            <option value="0">Masquer</option>
            <option value="1">Visible</option>
          </select>
          <button
            className="update-button"
            type="button"
            onClick={() => visibleProduct(idProd)}
          >
            Mettre à jour
          </button>
        </div>
        <div className="suppress-product">
          <p className="update-text">Supprimer un produit :</p>
          <select
            className="update-selector"
            name="produits"
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            <option value="select">Selectionner un produit</option>
            {productsGet.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.title}
              </option>
            ))}
          </select>
          <button
            className="update-button"
            type="button"
            onClick={() => deleteProduct(idProd)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
