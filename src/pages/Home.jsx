import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import Banner from "../components/Banner";
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
        <Banner />
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <div className="offer-list">
            {offers.map((offer) => (
              <Card offer={offer} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
