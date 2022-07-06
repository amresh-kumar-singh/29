import { useEffect, useState } from "react";
import { GameState } from "../../context/game";
import playersArr from "../../utils/playersArr";
import CardsPattern from "./CardsPattern";

const Trump = () => {
  const {
    players,
    currentPlayer,
    initialPlayer,
    color: [colorStatus, colorCard],
    setColor,
    table,
  } = GameState();
  const [cover, setCover] = useState(null);

  useEffect(() => {
    console.log(colorCard, colorStatus);
    !colorStatus ? setCover(null) : setCover(colorCard);
  }, [colorStatus]);
  // console.log("colorStatus:", colorStatus, colorCard);
  const handleShow = () => {
    //TODO player is current player also for
    if (
      players[playersArr[currentPlayer[0]]].filter(
        (item) => item[1] === (table.length && table[initialPlayer][1])
      ).length === 0
    ) {
      // setCover(color[1]);
      setColor((prev) => [true, prev[1]]);
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
