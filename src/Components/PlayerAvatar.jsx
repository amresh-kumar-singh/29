import { GameState } from "../context/game";
import { ThemeState } from "../context/theme";
import playersArr from "../utils/playersArr";
import "./component.css";

const PlayerAvatar = ({ imgSrc, orientation }) => {
  const { theme } = ThemeState();
  const { initialPlayer, currentPlayer } = GameState();

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
