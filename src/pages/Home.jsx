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
        console.log(response.data);
        setOffers(response.data);
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
      <h1>home page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {offers.map((offer) => (
            <li key={offer._id}>
              <Link to={`/offer/${offer._id}`}>{offer.product_name}</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/offer">lien vers une offre</Link>
    </div>
    </>
  )
}

export default Home
