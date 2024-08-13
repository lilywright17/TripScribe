import { Paper } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

// Defining a custom photo component to display images
export const CustomPhoto = ({ url }) => {
  // Accessing theme for responsive design
  const theme = useTheme();
  // Media queries to determine screen size
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  // Determine the size of the CustomPhoto based on screen size using ternary logic
   const photoWidth = isSm ? '60%' : isMd ? '80%' : '60%';
   const photoHeight = isSm ? "180px" : isMd ? "220px" : "280px";

  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: photoWidth,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <img
        src={url}
        alt="carousel item"
        style={{
          width: "100%",
          objectFit: "cover",
          borderRadius: "12px",
          height: photoHeight,
          objectFit: "cover",
          display: "block",
        }}
      />
    </Paper>
  );
};
