import { Paper } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

export const CustomPhoto = ({ url }) => {
  const theme = useTheme();

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const photoWidth = isSm ? '100%' : isMd ? '80%' : '60%';
  const photoHeight = isSm ? "200px" : isMd ? "260px" : "320px";

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
          display: "block",
        }}
      />
    </Paper>
  );
};
