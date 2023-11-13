import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="filled-star" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="filled-star" />);
    }

    const emptyStars = totalStars - stars.length;

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="empty-star" />);
    }

    return stars;
  };

  return <div className="rating-stars">{renderStars()}</div>;
};

export default Stars;
