import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Offer = ({title, price, token}) => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    if (token) {navigate("/payment", {
      state: { title: offer.product_name, price: offer.product_price, token: token }
    })
  } else { navigate("/login")}

  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="offer">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="offer">
            <div className="offer-image">
              <img src={offer.product_image.secure_url} alt={offer.product_name} />
            </div>
            <div className="offer-details">
              <div className="offer-info">
                <p>{offer.product_price} €</p>
                {offer.product_details.map((detail) => {
                  const keys = Object.keys(detail);
                  const keyName = keys[0];
                  return (
                    <p key={keyName}>
                      {capitalizeFirstLetter(keyName)}: {detail[keyName]}
                    </p>
                  );
                })}
              </div>
              <button onClick={handleBuy}>Acheter</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Offer;
