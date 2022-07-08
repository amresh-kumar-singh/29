import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useSave from "../hooks/useSave";

const ExitGame = ({ setStartGame }) => {
  const [saveStatus, setSaveStatus] = useState(false);
  const save = useSave();
  const handleExit = () => {
    save();
    setSaveStatus(true);
  };
  useEffect(() => {
    saveStatus && setStartGame(false);
    // eslint-disable-next-line
  }, [saveStatus]);

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ zIndex: "6", position: "absolute", bottom: "15%", right: "1%" }}
      size="large"
      onClick={handleExit}
    >
      <ExitToAppIcon />
    </Button>
  );
};
export default ExitGame;
