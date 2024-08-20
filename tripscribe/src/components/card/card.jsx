import React from "react";
import "./card.css";

export const Card = ({
  country,
  city,
  startDate,
  endDate,
  description,
  imageUrl,
  onClick,
}) => {
  const handleCardClick = () => {
    onClick(); // Trigger the navigation to TripDetails page
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img
        src={imageUrl}
        alt={city || "photo of city"}
        width={200}
        className="card-img"
      />
      <h1>{country || "country"}</h1>
      <h2>{city || "town/city"}</h2>
      <p>
        {startDate || "start date"} - {endDate || "end date"}
      </p>
      <p>{description.trim() || "description of trip"}...</p>
    </div>
  );
};
