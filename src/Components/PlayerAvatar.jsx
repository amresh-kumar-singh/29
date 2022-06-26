import { useEffect, useRef } from "react";
import { GameState } from "../context/game";
import { ThemeState } from "../context/theme";
import useBot from "../hooks/useBot";
import playersArr from "../utils/playersArr";
import "./component.css";

const PlayerAvatar = ({ imgSrc, orientation }) => {
  const { theme } = ThemeState();
  const { initialPlayer, currentPlayer, players } = GameState();
  const bot = useBot();
  useEffect(() => {
    console.log("this is from use Effetct", currentPlayer[0]);
    if (
      playersArr[currentPlayer[0]] === orientation &&
      players[playersArr[currentPlayer[0]]].length !== 0
    ) {
      console.log(
        currentPlayer[0],
        "< currentPlayer[0] InitailPlayer >",
        initialPlayer
      );
      setTimeout(() => {
        bot(currentPlayer[0]);
      }, 2000);
    }
  }, [currentPlayer]);

  return (
    <div
      className={`avatar-${orientation} avatar`}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(avatar/${imgSrc}.svg)`,
        borderColor: playersArr[currentPlayer] === orientation && "#7CFC00",
      }}
    >
      <p
        className="avatar-text"
        style={{
          background: "#" + theme.scoreboard.background,
          color: "#" + theme.scoreboard.color,
        }}
      >
        {orientation}
      </p>
    </div>
  );
};

export default PlayerAvatar;
