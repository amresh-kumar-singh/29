import { useEffect, useState } from "react";
import { GameState } from "../../context/game";
import CardsPattern from "./CardsPattern";

const OpponentScore = () => {
  const {
    opponentTeam: { score },
  } = GameState();
  const [type, setType] = useState();

  //number[0]--multiple, number[1]--remainder
  const [[multiple, remainder], setNumber] = useState([0, 0]);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    setNumber((prev) => [(score / 6) | 0, score % 6]);
    score >= 0 ? setType((prev) => "D") : setType((prev) => "C");
  }, [score]);

  useEffect(() => {
    setCover(6 - Math.abs(multiple) + type);
  }, [multiple, type]);

  return (
    <CardsPattern
      cover={cover}
      classCards="opponent"
      src={`6${type}`}
      number={remainder}
    />
  );
};
export default OpponentScore;
