import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching offer:", error);
        setIsLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  const handleBuy = () => {

  };

  return (
    <div className="offer">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="offer-details">
            <div className="offer-image">
              <img src={offer.product_image.secure_url} alt={offer.product_name} />
            </div>
            <div className="offer-info">
              <p>Prix: {offer.product_price} €</p>
              <p>Marque: {offer.product_details[0].MARQUE}</p>
              <p>Taille: {offer.product_details[1].TAILLE}</p>
              <p>État: {offer.product_details[2].ÉTAT}</p>
              <p>Couleur: {offer.product_details[3].COULEUR}</p>
              <p>Emplacement: {offer.product_details[4].EMPLACEMENT}</p>
            </div>
          </div>
          <button onClick={handleBuy}>Acheter</button>
        </>
      )}
    </div>
  );
};

export default Offer;
