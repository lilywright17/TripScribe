import React from "react";
import { useLocation } from "react-router-dom";
import { PhotoCarousel } from "../../components/carousel/carousel.jsx";
import Box from "@mui/material/Box";
import { Navbar } from "../../components/navbar/navbar.jsx";
import Button from "../../components/button/button.jsx";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import "./tripDetails.css";
import DeleteIcon from "@mui/icons-material/Delete";
import editButtonImage from "../myTrips/images/edit_button.png";

export const TripDetails = ({ trip }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const {
    country,
    city,
    startDate,
    endDate,
    images = [],
    description,
  } = location.state || {};

  //console.log("Images:", images);
  // TO BE COMPLETED!
  const handleDelete = () => {
    console.log("Delete!");
  };

  const handleEdit = () => {
    console.log("Edit!");
    navigate("/edittrip", { state: { trip } });
  };

  const handleGoBack = () => {
    console.log("Go Back!");
    navigate("/mytrips");
  };

  return (
    <div className="tripdetails">
      <Navbar />
      <div className="title">
        <div className="title-container">
          <h1>
            {country}, {city}
          </h1>
          <img
            className="edit-button"
            src={editButtonImage}
            alt="Edit button"
            onClick={handleEdit}
          />
        </div>
        <p className="dates">
          {startDate}-{endDate}
        </p>
      </div>
      <div className="box-conteiner">
        <Box
          sx={{
            padding: "20px",
            justifyContent: "center",
            width: "90%",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 2,
          }}
        >
          <PhotoCarousel images={images} />
        </Box>
      </div>
      <p className="description">{description}</p>
      <div className="delete-icon">
        <DeleteIcon onClick={handleDelete} />
      </div>
      <div className="button-container">
        <Button
          handleClick={handleGoBack}
          text="GO BACK"
          icon={<ArrowLeft size={20} />}
          style={{
            maxWidth: "200px",
            height: "50px",
            borderRadius: "26px",
            backgroundColor: "white",
            color: "black",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#476A6F",
          }}
        />
      </div>
    </div>
  );
};
