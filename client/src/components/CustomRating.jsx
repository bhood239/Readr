import React from "react";
import "./CustomRating.scss";

const CustomRating = ({ totalStars = 5, rating, setRating }) => {
  const handleRating = (rate) => {
    if (setRating) {
      setRating(rate);
    }
  };

  return (
    <div>
      {[...Array(totalStars)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={`star ${index <= rating ? "on" : "off"}`}
            onClick={() => setRating && handleRating(index)} // Only handle click if setRating is provided
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default CustomRating;
