import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton";
import { ArrowLeft } from "@phosphor-icons/react";
import { AddTripImgUpload } from "../../components/uploadImages/addTripImgUpload";
import "./editTrip.css";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import axios from "axios";

export const EditTripForm = () => {
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [images, setImages] = useState([]);
  const { tripID: paramTripID } = useParams();
  const tripID = Number(paramTripID);
  const [tripData, setTripData] = useState({
    country: "",
    city: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const maxLength = 500;
  const navigate = useNavigate();


  useEffect(() => {
    const token = sessionStorage.getItem("token");

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
        setTripData({
          country: response.data.country,
          city: response.data.city,
          startDate: response.data.startDate.split("T")[0],
          endDate: response.data.endDate.split("T")[0],
          description: response.data.description,
        });
        setImages(response.data.photos || []);
        setDescriptionLength(response.data.description.length);
      } catch (error) {
        console.error("Error fetching trip details:", error);

        const status = error.response?.status;

        if (status === 401 || status === 403) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
        } else {
          setErrorMessage(
            "Failed to load trip details. Please try again later."
          );
        }
      }
    };

    if (tripID && token) {
      getTripDetails();
    }
  }, [tripID, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (e) => {
    handleInputChange(e);
    setDescriptionLength(e.target.value.length);
  };

  const handleSecondaryButtonClick = (e) => {
    e.preventDefault();
    navigate(`/tripdetails/${tripID}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Attaching image URLs
    const photoUrls = images.map((image) => image.url);

    // Form validation logic - checking for empty input fields
    const newErrors = {};
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);

    if (!tripData.country) {
      newErrors.country = "Country cannot be empty";
    }
    if (!tripData.city) {
      newErrors.city = "City cannot be empty";
    }
    if (!tripData.startDate || !tripData.endDate) {
      newErrors.date = "Dates cannot be empty";
    } else if (startDate > endDate) {
      newErrors.date = "Start date cannot be after end date";
    }
    if (!tripData.description) {
      newErrors.description = "Description cannot be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const token = sessionStorage.getItem("token");

      // Map the frontend fields to backend expected fields
      const requestData = {
        country: tripData.country,
        city: tripData.city,
        description: tripData.description,
        date_from: tripData.startDate, // Renamed from startDate to date_from
        date_to: tripData.endDate, // Renamed from endDate to date_to
        photos: photoUrls,
      };
      await axios.put(
        `http://localhost:8000/api/edittrip/${tripID}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Display an alert "Successful editing message"
      setSuccessMessage(
        `The trip "${tripData.country}, ${tripData.city}" was successfully updated!`
      );

      setImages([]);
      // Wait 2 sec (2000 milliseconds) before navigating to TripDetails after the alert
      setTimeout(() => {
        navigate(`/tripdetails/${tripID}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating trip:", error);
      setErrorMessage("Failed to update the trip. Please try again later.");
    }
  };

  return (
    <>
      <form className="editTripForm" onSubmit={handleSubmit}>
        <div className="EditTripInputBoxes">
          <h2 className="editTripTitle">Edit Your Trip</h2>
          <Input
            labelText="Country"
            inputType="text"
            placeholderText="You can edit the country here"
            name="country"
            value={tripData.country}
            onChange={handleInputChange}
            className={errors.country ? "input-error" : ""}
          />
          {errors.country && <div className="error">{errors.country}</div>}
          <Input
            labelText="City/Town"
            inputType="text"
            placeholderText="You can edit the city here"
            name="city"
            value={tripData.city}
            onChange={handleInputChange}
            className={errors.city ? "input-error" : ""}
          />
          {errors.city && <div className="error">{errors.city}</div>}
          <Input
            labelText="Start Date"
            inputType="date"
            name="startDate"
            value={tripData.startDate}
            onChange={handleInputChange}
            className={errors.startDate ? "input-error" : ""}
          />
          <Input
            labelText="End Date"
            inputType="date"
            name="endDate"
            value={tripData.endDate}
            onChange={handleInputChange}
            className={errors.endDate ? "input-error" : ""}
          />
          {errors.date && <div className="error">{errors.date}</div>}
        </div>
        <div className="editTripContent">
          <div className="editTripDescriptionContainer">
            <label htmlFor="description">Description</label>
            <textarea
              className={`editTripTextDescription ${
                errors.description ? "input-error" : ""
              }`}
              id="description"
              name="description"
              rows="9"
              cols="50"
              placeholder="You can edit your trip details here..."
              maxLength={maxLength}
              value={tripData.description}
              onChange={handleDescriptionChange}
            ></textarea>
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
            <div className="characterCount">
              {descriptionLength}/{maxLength} characters
            </div>
          </div>
          <div className="addImg">
            <p className="editPhotosTag">Edit your photos</p>
            <AddTripImgUpload
              inputType="file"
              images={images}
              setImages={setImages}
              multiple
            />
          </div>
        </div>
        <div className="editTripButtonContainer">
          <SecondaryButton
            text="GO BACK"
            icon={<ArrowLeft size={20} />}
            handleClick={handleSecondaryButtonClick}
            style={{ borderRadius: "30px" }}
          />
          <Button
            text="SAVE MY CHANGES"
            type="submit"
            style={{ borderRadius: "30px" }}
          />
        </div>
      </form>
      {successMessage && (
        <Stack sx={{ width: "100%" }} spacing={2} message={successMessage}>
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
        <Stack sx={{ width: "100%" }} spacing={2} message={successMessage}>
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
