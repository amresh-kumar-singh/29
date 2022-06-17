import CardsPattern from "../Cards/CardsPattern";
import { ThemeState } from "../../context/theme";
import TableCards from "./TableCards";
import "./tableStyle.css";

const GameTable = () => {
  const { theme } = ThemeState();

  return (
    <div
      className="table"
      style={{
        backgroundImage: `linear-gradient(${theme.table})`,
      }}
    >
      <CardsPattern classCards="player" />
      <CardsPattern classCards="trump" />
      <CardsPattern classCards="opponent" />
      <TableCards />
    </div>
  );
};
export default GameTable;
