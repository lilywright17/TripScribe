import React from "react";
import Carousel from "react-material-ui-carousel";
import { useTheme, useMediaQuery  } from "@mui/material";
import { CustomPhoto } from "../customPhoto/customPhoto";

export const PhotoCarousel = ({ images }) => {
  const theme = useTheme(); 

  const sliceArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
   const isMd = useMediaQuery(theme.breakpoints.down('md'));
   const isLg = useMediaQuery(theme.breakpoints.down('lg'));
 
   const itemsPerPage = isSm ? 1 : isMd ? 2 : 3;

  const imageSlices = sliceArray(images, itemsPerPage);

  return (
    <Carousel
      navButtonsAlwaysVisible={true} 
      indicators={true} 
      animation="slide" 
      autoPlay={false} 
      style={{ maxWidth: "100%" }}
    >
      {imageSlices.map((slice, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {slice.map((image, idx) => (
            <CustomPhoto key={idx} url={image.url} />
          ))}
        </div>
      ))}
    </Carousel>
  );
};
