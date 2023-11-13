import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const CreateReviewForm = ({ onAdd, user_id, brewery_id }) => {
  console.log(user_id);
  console.log(brewery_id);
  const [description, setDescription] = useState("");
  const [rating, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const { user } = useAuthContext();
  const stars = Array(5).fill(0);
  const [error, setError] = useState(null);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    console.log(user_id);
    try {
      const response = await fetch("/api/breweries/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          user_id,
          brewery_id,
          rating,
          description,
        }),
      });
      if (response.ok) {
        console.log("Review created successfully!");
        onAdd({ user_id, brewery_id, rating, description });
      } else {
        console.error("Failed to create review");
        setError(response.error);
      }
    } catch (error) {
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    }
  };

  return (
    <>
      <form style={styles.container} onSubmit={handleSubmit}>
        <h2> React Ratings </h2>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || rating) > index ? colors.orange : colors.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
                value={rating}
                onChange={(e) => setDescription(rating)}
              />
            );
          })}
        </div>
        <textarea
          placeholder="Suggest me Something?"
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Submit
        </button>

        <Link to={`/`}>
          <button className="back">Back to Home</button>
        </Link>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default CreateReviewForm;
