import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { Button } from "@mui/material";

export default function TextPropos() {
  const [textPropos, setTextPropos] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}team`)
        .then((response) => response.data);
      setTextPropos(data);
      // console.log(data);
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

  const style =
    textPropos.length === 1 ? "team-container-bis" : "team-container";

  return (
    <div className="team-main">
      <h2 className="teamtitle">Notre Équipe</h2>
      <span className="spanLine" />
      {textPropos.map((text) => (
        <div className={style} key={text.id}>
          <div className="container-image-propos">
            <div className="container--paragraphe-propos">
              <p className="team-title">{text.name}</p>
            </div>
            <img
              className="team-image"
              src={`${import.meta.env.VITE_IMAGES_URL}${text.image}`}
              alt={text.alt}
            />
          </div>
          {showMore ? (
            <p key={text.id} className="team-body">
              {parse(text.text.substring(0, 250).concat("..."))}
            </p>
          ) : (
            <p className="team-body">{parse(text.text)}</p>
          )}
          <Button
            sx={{
              margin: "0px",
            }}
            variant="outlined"
            id="buttonshowmore"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Voir plus" : "Voir moins"}
          </Button>
        </div>
      ))}
    </div>
  );
}
