import { useEffect, useState } from "react";
import { GameState } from "../../context/game";
import CardsPattern from "./CardsPattern";

const PlayerScore = () => {
  const { yourTeam } = GameState();
  const [type, setType] = useState();
  //number[0]--multiple, number[1]--remainder
  const [number, setNumber] = useState([0, 0]);
  const [cover, setCover] = useState(null);
  useEffect(() => {
    console.log("player score", yourTeam.score);
    setNumber((prev) => [(yourTeam.score / 6) | 0, yourTeam.score % 6]);
    yourTeam.score >= 0 ? setType((prev) => "H") : setType((prev) => "S");
  }, [yourTeam.score]);

  useEffect(() => {
    console.log("ran from Number[0]", number);
    setCover(6 - Math.abs(number[0]) + type);
  }, [number[0]]);

  return (
    <CardsPattern
      cover={cover}
      classCards="player"
      src={`6${type}`}
      number={number[1]}
    />
  );
};
export default PlayerScore;
