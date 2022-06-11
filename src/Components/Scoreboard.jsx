import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";
const Scoreboard = () => {
  const { opponentTeam, yourTeam, call } = GameState();
  return (
    <div
      style={{
        zIndex: 5,
        position: "absolute",
        left: "2%",
        background: "black",
        opacity: "0.5",
        color: "white",
        padding: "10px 20px",
        top: "1%",
        borderRadius: "20%",
      }}
    >
      <p
        style={{
          margin: "0",
          marginBottom: "10px",
          textDecoration: "underline",
          fontSize: "1.2em",
        }}
      >
        Points
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>You Team: {yourTeam.point}</span>
        <span>Opponent: {opponentTeam.point} </span>
        {call.call >= 0 && (
          <span style={{ fontSize: "20px", borderTop: "2px solid pink" }}>
            {playersArr[call?.caller]}: {call?.call}
          </span>
        )}
      </div>
    </div>
  );
};
export default Scoreboard;
