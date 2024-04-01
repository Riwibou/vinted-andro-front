/* eslint-disable react/prop-types */

import axios from "axios";
import { useState, useEffect } from "react";

import Banner from "../components/Banner";
import Card from "../components/Card";

const Home = ({search}) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <>
      <div className="home">
        <Banner />
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <div className="offer-list">
            {offers.map((offer) => (
              <Card key ={offer._id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
