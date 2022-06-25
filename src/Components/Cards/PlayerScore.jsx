import { memo } from "react";
import { useEffect, useState } from "react";
import { GameState } from "../../context/game";
import CardsPattern from "./CardsPattern";

const PlayerScore = () => {
  const {
    yourTeam: { score },
  } = GameState();
  const [type, setType] = useState();
  // console.log("player renderd");
  //number[0]--multiple, number[1]--remainder
  const [[multiple, remainder], setNumber] = useState([0, 0]);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    console.log("player score", score);
    setNumber((prev) => [(score / 6) | 0, score % 6]);
    score >= 0 ? setType((prev) => "H") : setType((prev) => "S");
  }, [score]);

  useEffect(() => {
    setCover(6 - Math.abs(multiple) + type);
  }, [multiple, type]);

  return (
    <CardsPattern
      cover={cover}
      classCards="player"
      src={`6${type}`}
      number={remainder}
    />
  );
};
export default memo(PlayerScore);
