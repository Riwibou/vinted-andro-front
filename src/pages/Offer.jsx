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
            <h1>Offer</h1>
            <div className="offer-image">
              <img src={offer.product_image.secure_url} alt={offer.product_name} />
            </div>
            <div className="offer-info">
              <p>{offer.product_price} €</p>
              {offer.product_details.map((detail) => {
                const keys = Object.keys(detail)
                const keyName = keys[0]
                return (
                  <p key={keyName}>
                    {keyName} {detail[keyName]}
                  </p>
                )
              })}
            </div>
          </div>
          <button onClick={handleBuy}>Acheter</button>
        </>
      )}
    </div>
  );
};

export default Offer;
