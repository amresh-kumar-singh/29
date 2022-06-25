import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";

const useTurn = () => {
  const { setTable, setPlayers, setCurrentPlayer, table } = GameState();

  function turn(player = 0, card) {
    setTable((prev) => {
      // return (prev[player] = card); this one insert element
      prev[player] = card;
      return [...prev];
    });
    // setInitialPlayer((player + 1) % 4);
    // when table length is four both use turn and useScore setCurrent player
    //useScore setInitial player that in turn sets current player
    console.log(table, "tabel from use turn");
    // if (table.filter((item) => item).length !== 4 || player === 0) {
    // if (table.filter((item) => item).length !== 4) {
    //   console.log("inside if");
    setCurrentPlayer((prev) => (player + 1) % 4);
    // }
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
