import { useEffect } from "react";
import { GameState } from "../context/game";
import { ThemeState } from "../context/theme";
import useBot from "../hooks/useBot";
import playersArr from "../utils/playersArr";
import "./component.css";

const PlayerAvatar = ({ orientation, currentBidder, visited }) => {
  const { theme } = ThemeState();
  const {
    initialPlayer,
    currentPlayer,
    players,
    table,
    color: [, colorCard],
    call,
  } = GameState();
  const bot = useBot();

  useEffect(() => {
    if (
      playersArr[currentPlayer[0]] === orientation &&
      players[playersArr[currentPlayer[0]]].length !== 0 &&
      colorCard &&
      currentPlayer[0] !== 0
    ) {
      setTimeout(() => {
        bot(currentPlayer[0]);
      }, 1500);
    }
    // eslint-disable-next-line
  }, [currentPlayer]);

  return (
    <div
      className={`avatar-${orientation} avatar`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className={`rotate-circle ${
          currentBidder || currentBidder === 0
            ? playersArr[currentBidder] === orientation && "active-bidder"
            : playersArr[table === null ? initialPlayer : currentPlayer] ===
                orientation &&
              !currentBidder &&
              "active"
        }`}
      ></div>
      <div
        className={`avatar`}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(avatar/${
            theme.avatar[playersArr.indexOf(orientation)]
          }.svg)`,
          width: "94%",
        }}
      >
        <p
          className="avatar-text"
          style={{
            background: "#" + theme.scoreboard.background,
            color: "#" + theme.scoreboard.color,
          }}
        >
          {visited.length === 0
            ? orientation
            : visited.includes(playersArr.indexOf(orientation))
            ? "Pass"
            : playersArr.indexOf(orientation) === call.caller
            ? call.call
            : orientation}
        </p>
      </div>
    </div>
  );
};

export default PlayerAvatar;
