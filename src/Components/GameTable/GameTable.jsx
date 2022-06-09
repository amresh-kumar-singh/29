import CardsPattern from "../Cards/CardsPattern";
import { ThemeState } from "../../context/theme";
import TableCards from "./TableCards";

const GameTable = () => {
  const { theme } = ThemeState();

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        height: "92vh",
        width: "124vh",
        borderRadius: "50%",
        backgroundImage: `linear-gradient(${theme.table})`,
        boxShadow: "0px 0px 10px inset, 0px 49px 49px",
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
