import { memo } from "react";
import { useEffect, useState } from "react";
import { GameState } from "../../context/game";
import CardsPattern from "./CardsPattern";

const PlayerScore = () => {
  const {
    yourTeam: { score, colorScore },
  } = GameState();

  const [type, setType] = useState("H");
  const [cover, setCover] = useState(null);

  useEffect(() => {
    score >= 0 ? setType((prev) => "H") : setType((prev) => "S");
  }, [score]);

  useEffect(() => {
    setCover(`${6 - Math.abs(colorScore)}${colorScore > 0 ? "H" : "S"}`);
  }, [colorScore]);

  return (
    <CardsPattern
      cover={cover}
      classCards="player"
      src={`6${type}`}
      number={Math.abs(score)}
    />
  );
};
export default memo(PlayerScore);
