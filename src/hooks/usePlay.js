import { GameState } from "../context/game";

const usePlay = () => {
  const { table, setTable } = GameState();

  function play(player, card) {
    setTable((prev) => prev.push(card));
  }

  return play;
};
export default usePlay;
