import { Slide, Snackbar } from "@mui/material";
import { forwardRef, useState } from "react";
import { useEffect } from "react";
import MuiAlert from "@mui/material/Alert";

function SlideDown(props) {
  return <Slide {...props} direction="down" />;
}
const Alert = forwardRef(function Alert(props, ref) {
  function opacity(sev) {
    if (sev === "error") {
      return "rgba(211, 47, 47, 0.8)";
    } else if (sev === "success") {
      return "rgba(46, 125, 50,0.8)";
    } else if (sev === "warning") {
      return "rgba(237, 108, 2,0.8)";
    }
  }
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      sx={{
        ...props.sx,
        backgroundColor: opacity(props.severity),
        justifyContent: "center",
        padding: "0",
      }}
    />
  );
});

const Online = () => {
  const [status, setStatus] = useState(() => {
    return window.navigator.onLine ? "" : "Your Currently Offline";
  });

  useEffect(() => {
    window.addEventListener("online", onlineStatus);
    window.addEventListener("offline", offlineStatus);
    window?.navigator?.serviceWorker?.addEventListener("message", sWMessage);

    function sWMessage({ data }) {
      if ("isOnline" in data) {
        setStatus(data.isOnline);
      }
    }
    function onlineStatus() {
      setStatus("Back Online");
    }
    function offlineStatus() {
      navigator?.serviceWorker?.controller?.postMessage({ checkOnline: true });
    }
    // Clean up of Event listner
    return () => {
      window.removeEventListener("online", onlineStatus);
      window.removeEventListener("offline", offlineStatus);
      window?.navigator?.serviceWorker?.removeEventListener(
        "message",
        sWMessage
      );
    };
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus("");
  };

  return (
    <div>
      <Snackbar
        open={!!status}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideDown}
        sx={{ top: { xs: 0 } }}
        onClose={handleClose}
      >
        <Alert
          severity={status.includes("Online") ? "success" : "error"}
          sx={{ width: "100%", [!status && "visibility"]: "hidden" }}
        >
          {status}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Online;
