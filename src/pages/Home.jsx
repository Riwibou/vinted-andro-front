import { Link } from "react-router-dom";
import axios from "axios"
import {useState, useEffect} from "react";

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
      <h1>Home page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="offer-list">
          {offers.map((offer) => (
            <li key={offer._id} className="offer-item">
              <Link to={`/offer/${offer._id}`} className="offer-link">
                <div className="offer-details">
                  <div className="offer-image">
                    <img src={offer.product_pictures[0].secure_url} alt={offer.product_name} />
                  </div>
                  <div className="offer-info">
                    <p>{offer.product_name}</p>
                    <p>{offer.product_price} €</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}

export default Home
