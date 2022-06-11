import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";

const useTurn = () => {
  const { setTable, setPlayers } = GameState();

  function turn(player = 0, card) {
    setTable((prev) => {
      // return (prev[player] = card); this one insert element
      prev[player] = card;
      return [...prev];
    });

    setPlayers((prev) => {
      return {
        ...prev,
        [playersArr[player]]: prev[playersArr[player]].filter(
          (item) => item != card
        ),
      };
    });
  }

  return turn;
};
export default useTurn;
