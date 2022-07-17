import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { GameState } from "../context/game";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function Pair() {
  const { pairHolder } = GameState();
  const [color, setColor] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (pairHolder && pairHolder[0] === "0") {
      setOpen(true);
      setColor("success");
    } else if (pairHolder && pairHolder[0] === "1") {
      setColor("error");
      setOpen(true);
    }
    if (!pairHolder) {
      handleClose();
    }
  }, [pairHolder]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        // onClose={handleClose}
        sx={{ "& .MuiPaper-root": { minWidth: "150px" } }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          icon={false}
          onClose={handleClose}
          severity={color}
          sx={{ width: "100%" }}
        >
          👑 <strong>{pairHolder.substr(1).toUpperCase()}</strong> Got Pair👑
        </Alert>
      </Snackbar>
    </>
  );
}
