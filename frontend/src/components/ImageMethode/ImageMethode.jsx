import { useState, useEffect } from "react";
import axios from "axios";
import "./imageMethode.scss";
export default function ImageMethode() {
  const [imageMethode, setImageMethode] = useState([]);

  const getImage = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }pictures?categories=methode&picSection=1`
        )
        .then((response) => response.data);
      setImageMethode(data);
      // console.log(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-line
        alert("Picture doesn't exists");
      }
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div>
      {imageMethode.map((image) => (
        <div key={image.id}>
          <img
            className="imageMethode"
            src={`${import.meta.env.VITE_IMAGES_URL}${image.file}`}
            alt={image.alt}
          />
        </div>
      ))}
    </div>
  );
}