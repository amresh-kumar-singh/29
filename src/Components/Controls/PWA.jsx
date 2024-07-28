import { useState } from "react";
import Button from "@mui/material/Button";
import InstallDesktopTwoToneIcon from "@mui/icons-material/InstallDesktopTwoTone";
import InstallMobileTwoToneIcon from "@mui/icons-material/InstallMobileTwoTone";
import Prompt from "./Prompt";
import useDevice from "../../hooks/useDevice";
import useInstall from "../../hooks/useInstall";

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
        sx={{
          position: "absolute",
          zIndex: 5,
          top: "12%",
          right: "1%",
        }}
        onPointerUp={handleInstall}
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
