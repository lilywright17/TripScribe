import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PhotoCarousel } from "../../components/carousel/carousel.jsx";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton.jsx";
import { PopDialog } from "../../components/dialog/dialog.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { ArrowLeft } from "@phosphor-icons/react";
import editButtonImage from "./edit_button.png";
import './tripDetails.css';

export const TripDetails = () => {
  const navigate = useNavigate();
  const { tripID: paramTripID } = useParams();
  const tripID = Number(paramTripID); 
  
  const [trip, setTrip] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const getTripDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/trips/${tripID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching trip details:", error);
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          sessionStorage.removeItem('token');
          navigate('/login', { replace: true });
        } else {
          setErrorMessage('Failed to load trip details. Please try again later.');
        }
      }
    };

    if (tripID && token) {
      getTripDetails();
    }
  }, [tripID, navigate]);

  const handleDeleteIconClick = () => {
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/trips/${tripID}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setSuccessMessage(
        `The trip "${trip.country}, ${trip.city}" was successfully deleted!`
      );

      setTimeout(() => {
        navigate("/mytrips", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleEdit = (tripID) => {
    navigate(`/edittrip/${tripID}`);
  };

  const handleGoBack = () => {
    console.log("Go Back!");
    navigate("/mytrips");
  };

  if (!trip) {
    return <div><h1 className="loading">Loading Trip Details...</h1></div>;
  }

  return (
    <>
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
            onClick={() => handleEdit(tripID)}
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
            width: "95%",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 2,
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
      </div>
      {successMessage && (
        <Stack sx={{ width: '100%' }} spacing={2}
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
        </Stack>
      )}
      {errorMessage && (
        <Stack
          sx={{ width: '100%' }} spacing={2}
          message={successMessage}
        >
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setErrorMessage(null)}
            sx={{ fontSize: "1.25rem" }}
          >
            {errorMessage}
          </Alert>
        </Stack>
      )}
    
    </>
  );
};
