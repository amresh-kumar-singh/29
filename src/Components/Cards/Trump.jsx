import { useState } from "react";
import { GameState } from "../../context/game";
import playersArr from "../../utils/playersArr";
import CardsPattern from "./CardsPattern";

const Trump = () => {
  const { players, currentPlayer, initialPlayer, color, table } = GameState();
  const [cover, setCover] = useState();

  const handleShow = () => {
    //TODO player is current player also for
    if (
      players[playersArr[currentPlayer]].filter(
        (item) => item[1] === table[initialPlayer][1]
      ).length === 0
    ) {
      setCover(color);
    }
  };
  return (
    <CardsPattern
      cover={cover}
      classCards="trump"
      onClick={handleShow}
      src="red_joker"
      number={0}
    />
  );
};
export default Trump;