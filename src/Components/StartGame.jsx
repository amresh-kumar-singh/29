import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from "@mui/material/Button";
import { GameState } from "../context/game";

const StartGame = ({ handleShuffle }) => {
  const { gameCards } = GameState();

  return (
    <Button
      variant="contained"
      sx={{
        position: "absolute",
        zIndex: "6",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
      onClick={handleShuffle}
      startIcon={<PlayArrowIcon />}
    >
      {gameCards.length === 32 ? "Deal" : "Start Game"}
    </Button>
  );
};
export default StartGame;
