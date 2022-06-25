import { ThemeState } from "../../context/theme";
import TableCards from "./TableCards";
import "./tableStyle.css";
import Trump from "../Cards/Trump";
import PlayerScore from "../Cards/PlayerScore";
import OpponentScore from "../Cards/OpponentScore";

const GameTable = () => {
  const { theme } = ThemeState();

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

      <TableCards />
    </div>
  );
};
export default GameTable;
