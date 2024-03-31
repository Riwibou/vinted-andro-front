import { Link } from "react-router-dom";
import axios from "axios"
import {useState, useEffect} from "react";

import Banner from "../components/Banner"
import Card from "../components/Card";

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="home">
      <Banner/>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="offer-list">
          {offers.map((offer) => (
            <>
            <Card offer={offer}/>
            {/* <li key={offer._id} className="offer-item">
              <Link to={`/offer/${offer._id}`} className="offer-link">
                <div className="offer-details">
                  <img src={offer.owner.account.avatar?.secure_url} alt="avatar-user-account" />
                  <span>{offer.owner.account.username}</span>
                  <div className="offer-image">
                    <img src={offer.product_image.secure_url} alt={offer.product_name} />
                  </div>
                  <div className="offer-info">
                    <p>{offer.product_price} €</p>
                    <p>{offer.product_details[1].TAILLE}</p>
                    <p>{offer.product_details[0].MARQUE}</p>
                  </div>
                </div>
              </Link>
            </li> */}
            </>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default Home
