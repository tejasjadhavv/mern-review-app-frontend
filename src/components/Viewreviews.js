// src/components/BreweryDetails.js
import Stars from "../components/Star";
const ShowReviews = ({ reviews }) => {
  if (!reviews) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {reviews.map((review) => (
        <div className="panel-container">
          <p key={review._id}>
            <Stars rating={review.rating} />
            <p>{review.description}</p>
          </p>
        </div>
      ))}
    </>
  );
};

export default ShowReviews;
