import { useState } from "react";
import useDevice from "../../hooks/useDevice";
import Prompt from "./Prompt";
import InstallDesktopTwoToneIcon from "@mui/icons-material/InstallDesktopTwoTone";
import InstallMobileTwoToneIcon from "@mui/icons-material/InstallMobileTwoTone";
import useInstall from "../../hooks/useInstall";

import Button from "@mui/material/Button";

const PWA = () => {
  const [open, setOpen] = useState(true);
  const device = useDevice();
  const { install, handleInstall } = useInstall();

  const handleClick = () => {
    handleInstall();
    setOpen(false);
  };

  return (
    typeof install === "object" &&
    (!open ? (
      <Button
        variant="contained"
        sx={{ position: "absolute", zIndex: 5, top: "20%", right: "3%" }}
        onClick={handleInstall}
        endIcon={
          device === "Mobile" ? (
            <InstallMobileTwoToneIcon />
          ) : (
            <InstallDesktopTwoToneIcon />
          )
        }
      >
        Install
      </Button>
    ) : (
      <Prompt open={open} setOpen={setOpen} handleClick={handleClick} />
    ))
  );
};

export default PWA;
