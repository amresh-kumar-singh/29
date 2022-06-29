import { useEffect, useState } from "react";
import { GameState } from "../../context/game";
import CardsPattern from "./CardsPattern";

const OpponentScore = () => {
  const {
    opponentTeam: { score, colorScore },
  } = GameState();

  const [type, setType] = useState();
  const [cover, setCover] = useState(null);

  useEffect(() => {
    score >= 0 ? setType((prev) => "D") : setType((prev) => "C");
  }, [score]);

  useEffect(() => {
    setCover(`${6 - Math.abs(colorScore)}${colorScore > 0 ? "D" : "C"}`);
  }, [colorScore]);

  return (
    <CardsPattern
      cover={cover}
      classCards="opponent"
      src={`6${type}`}
      number={Math.abs(score)}
    />
  );
};
export default OpponentScore;
