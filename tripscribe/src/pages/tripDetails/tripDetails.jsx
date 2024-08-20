import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PhotoCarousel } from "../../components/carousel/carousel.jsx";
import Box from "@mui/material/Box";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton.jsx";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { PopDialog } from "../../components/dialog/dialog.jsx";
import "./tripDetails.css";
import DeleteIcon from "@mui/icons-material/Delete";
import editButtonImage from "../myTrips/images/edit_button.png";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const TripDetails = () => {
  const navigate = useNavigate();
  const { tripID: paramTripID } = useParams();
  const tripID = paramTripID;
  // Used for troubleshooting to fix the passing of tripID in the FE
  console.log("tripID (from params):", tripID, "Type:", typeof tripID);

  const [trip, setTrip] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const getTripDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/trips/${tripID}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        console.log("API Response:", response.data); // Logging response from BE
        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };
    if (tripID) {
      getTripDetails();
    }
  }, [tripID]);

  const handleDeleteIconClick = () => {
    setDialogOpen(true);
    //console.log("Delete Icon!");
  };

  // Handler to delete a trip and trip related photos
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/trips/${tripID}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      // Display an alert "Successful deletion"
      setSuccessMessage(
        `The trip ${trip.country}, ${trip.city} was successfully deleted!`
      );
      setOpenSnackbar(true);

      // Wait 2 sec(2000 milliseconds) before navigating to MyTrips after the alert
      setTimeout(() => {
        navigate("/mytrips");
      }, 2000);
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    console.log("Cancel button!");
  };

  // TO BE COMPLETED!
  const handleEdit = () => {
    console.log("Edit!");
    navigate("/edittrip", { state: { trip } });
  };

  const handleGoBack = () => {
    console.log("Go Back!");
    navigate("/mytrips");
  };

  // Conditional rendering to avoid accessing properties of a null object
  if (!trip) {
    return <div>Loading Trip Details...</div>;
  }

  return (
    <div className="trip-details">
      <div className="title-container">
        <div className="title">
          <h1>
            {trip.country}, {trip.city}
          </h1>
          <img
            className="edit-button"
            src={editButtonImage}
            alt="Edit button"
            onClick={handleEdit}
          />
        </div>
        <p className="dates">
          {trip.startDate
            ? new Date(trip.startDate).toLocaleDateString()
            : "No start date provided"}{" "}
          -
          {trip.endDate
            ? new Date(trip.endDate).toLocaleDateString()
            : "No end date provided"}
        </p>
      </div>
      <div className="box-container">
        <Box
          sx={{
            padding: "20px",
            justifyContent: "center",
            width: "85%",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 2,
            ml: "90px",
          }}
        >
          <PhotoCarousel images={trip.photos || []} />
        </Box>
      </div>
      <p className="description">{trip.description}</p>
      <div className="delete-icon">
        <DeleteIcon onClick={handleDeleteIconClick} />
        <PopDialog
          open={dialogOpen}
          handleClose={handleCancel}
          handleDelete={handleDelete}
          title={`Delete trip "${trip.country}, ${trip.city}"?`}
          content="Deleting this trip will be permanent?"
          agreeBtnText="DELETE"
          disagreeBtnText="CANCEL"
        />
      </div>
      <div className="button-container">
        <SecondaryButton
          handleClick={handleGoBack}
          text="GO BACK"
          icon={<ArrowLeft size={20} />}
          style={{
            borderRadius: "30px",
          }}
        />
      </div>
      {successMessage && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message={successMessage}
        >
          <Alert
            variant="filled"
            severity="success"
            onClose={() => setSuccessMessage(null)}
            sx={{ fontSize: "1.25rem" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
