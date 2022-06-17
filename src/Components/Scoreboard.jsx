import { Typography } from "@mui/material";
import { GameState } from "../context/game";
import { ThemeState } from "../context/theme";
import playersArr from "../utils/playersArr";
import "./component.css";

const Scoreboard = () => {
  const { opponentTeam, yourTeam, call } = GameState();
  const { theme } = ThemeState();
  console.log();
  return (
    <div
      className="scoreboard"
      style={{
        background: "#" + theme.scoreboard.background,
        color: "#" + theme.scoreboard.color,
      }}
    >
      <Typography variant="h6">Points</Typography>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body1">You Team: {yourTeam.point}</Typography>
        <Typography variant="body1">Opponent: {opponentTeam.point} </Typography>
        {call.call >= 0 && (
          <Typography
            sx={{ borderTop: "2px solid pink", textTransform: "uppercase" }}
          >
            {playersArr[call?.caller]}: {call?.call}
          </Typography>
        )}
      </div>
    </div>
  );
};
export default Scoreboard;
