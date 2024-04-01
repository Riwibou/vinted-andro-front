/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Selling({ token }) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    description: "",
    price: 0,
    condition: "",
    city: "",
    brand: "",
    size: 0,
    color: "",
    picture: null,
    pictureFromCloudinary: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setFormData((prevData) => ({
        ...prevData,
        pictureFromCloudinary: response.data.secure_url,
      }));
      navigate("/")
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <h2 className="selling-title">Vends ton article</h2>
        {formData.pictureFromCloudinary && (
          <img src={formData.pictureFromCloudinary} alt="" />
        )}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="picture"
          onChange={handleFileChange}
        />

        Titre
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="ex: Chemise Sézane verte"
        />

        Décris ton article
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="ex: porté quelques fois, taille correctement"
        />

        Marque
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="ex: Nike"
        />

        Taille
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="ex: 44"
        />

        Couleur
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="ex: blue"
        />

        Etat
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          placeholder="ex: Neuf"
        />

        Lieu
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="ex: Paris"
        />

        Prix
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="ex: 120"
        />

        <input type="submit" value="Envoyer la photo" />
      </form>
    </>
  );
}

export default Selling;
