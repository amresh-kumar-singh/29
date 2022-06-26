import { ThemeState } from "../../context/theme";
import TableCards from "./TableCards";
import "./tableStyle.css";
import Trump from "../Cards/Trump";
import PlayerScore from "../Cards/PlayerScore";
import OpponentScore from "../Cards/OpponentScore";
import { GameState } from "../../context/game";

const GameTable = () => {
  const { theme } = ThemeState();
  const { table } = GameState();

  return (
    <div
      className="table"
      style={{
        backgroundImage: `linear-gradient(${theme.table})`,
      }}
    >
      <PlayerScore />
      <Trump />
      <OpponentScore />

      {table !== null && <TableCards />}
    </div>
  );
};
export default GameTable;
