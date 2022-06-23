import { useEffect, useState } from "react";
import { GameState } from "../../context/game";
import CardsPattern from "./CardsPattern";

const OpponentScore = () => {
  const { opponentTeam } = GameState();
  const [type, setType] = useState();
  //number[0]--multiple, number[1]--remainder
  const [number, setNumber] = useState([0, 0]);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    setNumber((prev) => [(opponentTeam.score / 6) | 0, opponentTeam.score % 6]);
    opponentTeam.score >= 0 ? setType((prev) => "D") : setType((prev) => "C");
  }, [opponentTeam.score]);

  useEffect(() => {
    console.log("ran from Number[0]", number);
    setCover(6 - Math.abs(number[0]) + type);
  }, [number[0]]);

  return (
    <CardsPattern
      cover={cover}
      classCards="opponent"
      src={`6${type}`}
      number={number[1]}
    />
  );
};
export default OpponentScore;
