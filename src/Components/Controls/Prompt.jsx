import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Prompt({ open, setOpen, handleClick }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">
          {"Install 29 Playing Card Game ♥️♣️♦️♠️"}
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "0" }}>
          <DialogContentText id="alert-dialog-description">
            For better Gaming experience Please Install the App by clicking
            Install Button. You can also install it later by clicking Install
            button on right top corner.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onPointerUp={handleClose}>
            Cancle
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onPointerUp={handleClick}
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
