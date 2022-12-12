/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable-next-line import/no-unresolved */

import axios from "@services/axios";
import { useState, useEffect } from "react";
import "../App.css";
import AlertError from "@components/AlertError";
import AlertSucces from "@components/AlertSucces";

export default function ArticlePost() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileCreated, setFileCreated] = useState();
  const [description, setDescription] = useState("");
  const [updateFile, setUpdateFile] = useState();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleImage, setArticleImage] = useState([]);
  const [articleLink, setArticleLink] = useState("");
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  // on va specifier que seulement deux types de fichiers peuvent fonctionner
  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      // eslint-disable-next-line
      return alert("Select a jpeg or a png image");
    }
    return setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    // eslint-disable-next-line
    const dataT = {
      articleTitle,
      articleLink,
      description,
    };
    formData.append("pictureData", JSON.stringify(dataT));

    if (
      confirm(
        "Êtes vous sûr de vouloir soumettre ces modifications? \nCliquer sur OK pour confirmer ou annuler."
      )
    )
      try {
        const { data } = await axios.post("article/upload", formData);
        // eslint-disable-next-line no-undef
        setArticleImage([]);
        // eslint-disable-next-line no-undef
        setSucces(true);
        setFileCreated(data);
        return alert(
          "Article ajouter !",
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      } catch (err) {
        if (err) {
          setError(true);
        }
      }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append(
      "pictureData",
      JSON.stringify({
        articleTitle,
        articleLink,
        description,
      })
    );
    // console.log(text);
    const id = updateFile;
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}article/update/${id}`,
        formData
      );
      // console.log(data);
      getImage();
      // eslint-disable-next-line no-use-before-define
      setSucces(true);
      setUpdateFile(data);
      return alert(
        "Article mis à jour !",
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      );
    } catch (err) {
      if (err) {
        setError(true);
      }
    }
  };

  const getImage = async () => {
    try {
      const data = await axios.get(`article`).then((response) => response.data);
      // console.log(data);
      setArticleImage(data);
    } catch (err) {
      if (err) {
        setError(true);
      }
    }
  };

  const imageDelete = async (id) => {
    if (
      confirm(
        "Êtes vous sûr de vouloir soumettre ces modifications? \nCliquer sur OK pour confirmer ou annuler."
      )
    )
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}article/${id}`, {
          body: articleImage,
        });

        return alert(
          "Article supprimer !",
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <section>
      {error ? <AlertError /> : ""}
      {succes ? <AlertSucces /> : ""}
      <form className="upload-container" onSubmit={handleSubmit}>
        <label htmlFor="upload-picture">
          Choisir une image:
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleInput}
          />
        </label>
        <label htmlFor="picture-title">
          {" "}
          Titre de l'article :
          <input
            type="text"
            placeholder="Titre de l'article"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </label>
        <label htmlFor="picture-title">
          {" "}
          Lien de l'article :
          <input
            type="text"
            placeholder="Lien de l'article"
            value={articleLink}
            onChange={(e) => setArticleLink(e.target.value)}
          />
        </label>
        <label htmlFor="picture-description">
          {" "}
          Description de l'image:
          <input
            type="text"
            placeholder="Description de l'image"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="picture-id">
          <select onChange={(e) => setUpdateFile(e.target.value)}>
            <option value="Select">Choisir un article existant :</option>
            {articleImage.length
              ? articleImage.map((img) => (
                  <option value={img.id} key={img.id}>
                    {img.title}
                  </option>
                ))
              : "Il n'y a pas d'images"}
          </select>
        </label>
        {selectedFile && (
          <img
            src={`${import.meta.env.VITE_IMAGES_URL}${selectedFile.image}`}
            alt={selectedFile.alt}
          />
        )}
        <button type="submit">Ajouter un article</button>

        {/* <Update /> */}
        {updateFile && (
          <img
            src={`${import.meta.env.VITE_IMAGES_URL}${articleImage.file}`}
            alt={updateFile.alt}
          />
        )}
        {/* <button type="button" onClick={handleUpdate}>
          {" "}
          Mettre à jour une image
        </button> */}
        <button type="button" onClick={() => imageDelete(updateFile)}>
          {" "}
          Supprimer un article
        </button>
        {fileCreated && (
          <img
            className="upload-image"
            src={`${import.meta.env.VITE_IMAGES_URL}${fileCreated.file}`}
            alt={fileCreated.alt}
          />
        )}
      </form>
    </section>
  );
}
