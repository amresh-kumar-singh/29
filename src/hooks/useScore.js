import { useEffect } from "react";
import { GameState } from "../context/game";
import points from "../utils/points";
let arr = ["7", "8", "Q", "K", "1", "A", "9", "J"];

const useScore = () => {
  const {
    table,
    setTable,
    setOpponentTeam,
    setYourTeam,
    initialPlayer,
    setInitialPlayer,
    setGameCards,
  } = GameState();

  function score() {
    if (table.filter((item) => item).length == 4) {
      let winner = 0;
      let tempWinner = -1;
      let temp = table.reduce((acc, item, i) => {
        if (
          arr.indexOf(item[0]) > tempWinner &&
          table[initialPlayer][1] == item[1]
        ) {
          tempWinner = arr.indexOf(item[0]);
          winner = i;
        }
        return points[item[0]] + acc;
      }, 0);

      if (winner == 0 || winner == 2) {
        setYourTeam((prev) => {
          return {
            ...prev,
            point: prev.point + temp,
          };
        });
      } else {
        setOpponentTeam((prev) => {
          return {
            ...prev,
            point: prev.point + temp,
          };
        });
      }
      //   setPoint((prev) => prev + temp);
      setInitialPlayer(winner);
      setGameCards((prev) => [...prev, ...table]);
      setTable([]);
      console.log(winner, initialPlayer);
    }
  }

  return score;
};
export default useScore;
