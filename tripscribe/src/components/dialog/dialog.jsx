import { DialogActions, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "../button/button";
import { SecondaryButton } from "../secondaryButton/secondaryButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // The Dialog will take up the entire screen when Screen size is small

  return (
    <div className="dialog">
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            minWidth: "300px",
            borderRadius: "16px", 
            padding: "20px",
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <SecondaryButton
            text={disagreeBtnText}
            handleClick={handleClose}
            style = {{
              height: "60px",
              paddingLeft: "30px",
              paddingRight: "30px",
              borderRadius: "30px"
            }}
          ></SecondaryButton>
          <Button 
            handleClick={handleDelete} 
            text={agreeBtnText}
            style = {{
              height: "60px",
              paddingLeft: "30px",
              paddingRight: "30px",
              borderRadius: "30px"
            }}>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//Use {title} to set up title name for the Modal
//Use {hadleClose} to handle the closing of the modal
//Use {content} to ask the user for decision question for example
