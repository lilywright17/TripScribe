import { DialogActions, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../button/button.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./dialog.css";

// Dialog is a type of Modal component
export const PopDialog = ({
  open,
  handleClose,
  handleDelete,
  title,
  content,
  agreeBtnText,
  disagreeBtnText,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="dialog">
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions className="custom-dialog-actions">
          <Button
          className="buttonSecondary"
            text={disagreeBtnText}
            handleClick={handleClose}
          ></Button>
          <Button
          className="buttonPrimary"
            handleClick={handleDelete}
            text={agreeBtnText}
          ></Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//Use {title} to set up title name for the Modal
//Use {hadleclose} to handle the closing of the modal
//Use {content} to ask the user for desition quesyion for example
