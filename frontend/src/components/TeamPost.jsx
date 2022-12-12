/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */

import { useState, useEffect } from "react";
import axios from "@services/axios";

export default function TeamPost() {
  const [selectedFile, setSelectedFile] = useState();
  // const [fileCreated, setFileCreated] = useState();
  const [teamName, setTeamName] = useState("");
  const [teamAlt, setTeamAlt] = useState("");
  const [teamText, setTeamText] = useState("");
  const [teamGet, setTeamGet] = useState([]);
  const [teamImage, setTeamImage] = useState([]);
  const [idTeam, setIdTeam] = useState("");

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

    const dataTeam = {
      teamName,
      teamAlt,
      teamText,
    };

    if (!teamName || !teamAlt || !teamText) {
      return alert(
        "Provide all the fields before submitting a new team member"
      );
    }

    formData.append("pictureData", JSON.stringify(dataTeam));

    try {
      const { data } = await axios.post("team/upload", formData);
      setTeamImage([]);
      setSelectedFile(data);
      return alert(
        "Membre d'équipe ajouté !",
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      );
    } catch (err) {
      return alert("Une erreur s'est produite lors de l'ajout");
    }
  };

  const getTeamMember = async () => {
    try {
      const data = await axios.get("team").then((res) => res.data);
      setIdTeam(data.id);
      setTeamGet(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTeam = async () => {
    const id = selectedFile;
    if (confirm("Etes vous sur de vouloir soumettre ces modifications ?"))
      try {
        const data = await axios.delete(`team/${id}`, {
          id,
        });
        return alert(
          `Membre numero ${id} supprimer !`,
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {
    getTeamMember();
  }, []);

  return (
    <div className="team-container">
      <form className="upload-container-team" onSubmit={handleSubmit}>
        <label htmlFor="upload-picture">
          Choisir un fichier :
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleInput}
          />
        </label>
        <label htmlFor="picture-description">
          Description de l'image
          <input
            type="text"
            placeholder="Photo de Jean Dupont"
            value={teamAlt}
            onChange={(e) => setTeamAlt(e.target.value)}
          />
        </label>
        <label htmlFor="team-member-title">
          Nom et Prénom du membre d'équipe :
          <input
            type="text"
            placeholder="Jean Dupont"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </label>
        <label htmlFor="team-member-text">
          Texte à ajouter :
          <textarea
            className="team-input-text"
            type="text"
            placeholder="Text..."
            value={teamText}
            onChange={(e) => setTeamText(e.target.value)}
          />
        </label>
        <button type="submit">Ajouter un Membre à l'équipe</button>
      </form>

      <div className="update-team">
        <p className="update-text-team"> Supprimer un membre d'équipe :</p>
        <select
          className="update-selector-team"
          name="team"
          onChange={(e) => setSelectedFile(e.target.value)}
        >
          <option value="select">
            Selectionner un membre d'équipe à supprimer{" "}
          </option>
          {teamGet.map((membTeam) => (
            <option value={membTeam.id} key={membTeam.id}>
              {membTeam.name}
            </option>
          ))}
        </select>

        <button
          className="update-button"
          type="button"
          onClick={() => deleteTeam(idTeam)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
