import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateReviewForm from "../components/Createreview";
import ShowReviews from "../components/Viewreviews";
import Stars from "../components/Star";
import { useAuthContext } from "../hooks/useAuthContext";

const BreweryDetails = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBreweryDetails = async () => {
      try {
        const response = await axios.get(`api/breweries/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const fetchedBrewery = response.data;
        setBrewery(fetchedBrewery);
      } catch (error) {
        console.error("Error fetching brewery details:", error);
      }
    };
    if (user) {
      fetchBreweryDetails();
    }
  }, [id, user]);

  const [reviews, setReview] = useState([]);
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`/api/breweries/reviews/:${id}`);
        const fetchedReview = response.data;
        setReview(fetchedReview);
      } catch (error) {
        console.error("Error fetching brewery details:", error);
      }
    };

    fetchReviewDetails();
  }, [id]);

  const addReview = async (review) => {
    setReview([...reviews, review]);
  };

  if (!brewery) {
    return <p>Loading...</p>;
  }

  return (
    <div className="panel">
      <div>
        <h2>{brewery.name}</h2>
        <p>Address: {brewery.address_1}</p>
        <p>Phone: {brewery.phone}</p>
        <p>Website: {brewery.website_url}</p>
        <p>State: {brewery.state}</p>
        <p>City: {brewery.city}</p>
        <h3>
          Rating: <Stars rating={brewery.rating} />{" "}
        </h3>
      </div>
      <ShowReviews reviews={reviews}></ShowReviews>
      <CreateReviewForm
        onAdd={addReview}
        user_id={user.email}
        brewery_id={brewery.id}
      ></CreateReviewForm>
    </div>
  );
};

export default BreweryDetails;
