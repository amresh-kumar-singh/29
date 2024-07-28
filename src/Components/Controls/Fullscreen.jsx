import useFullScreen from "../../hooks/useFullScreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const Fullscreen = () => {
  const { fullscreen, exitFullscreen } = useFullScreen();
  const [screenStatus, setScreenStatus] = useState(false);

  const handleScreenStatus = () => {
    if (screenStatus) {
      //   setScreenStatus(false);
      exitFullscreen();
    } else {
      //   setScreenStatus(true);
      fullscreen("landscape");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", mode);
    function mode() {
      if (
        window.innerHeight === window.screen.height &&
        window.innerWidth === window.screen.width
      ) {
        setScreenStatus(true);
      } else {
        setScreenStatus(false);
      }
    }
    return () => {
      window.removeEventListener("resize", mode);
    };
  }, []);

  return (
    <Button
      variant="contained"
      onPointerUp={handleScreenStatus}
      color="secondary"
      size="large"
      sx={{ position: "absolute", bottom: "1%", right: "1%" }}
    >
      {screenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </Button>
  );
};

export default Fullscreen;
