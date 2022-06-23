import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";

const useTurn = () => {
  const { setTable, setPlayers, setCurrentPlayer } = GameState();

  function turn(player = 0, card) {
    setTable((prev) => {
      // return (prev[player] = card); this one insert element
      prev[player] = card;
      return [...prev];
    });
    // setInitialPlayer((player + 1) % 4);
    setCurrentPlayer((player + 1) % 4);
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
