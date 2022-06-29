import { useState } from "react";
import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";

const useDeal = () => {
  const { gameCards, setPlayers, setGameCards, dealer, table } = GameState();
  const [round, setRound] = useState(1);

  function deal() {
    if (table?.length !== 0) {
      return;
    }
    setPlayers((prev) => {
      return {
        ...prev,
        [playersArr[(dealer + 1) % 4]]: [
          ...prev[playersArr[(dealer + 1) % 4]],
          ...gameCards.slice(0, 4),
        ],
        [playersArr[(dealer + 2) % 4]]: [
          ...prev[playersArr[(dealer + 2) % 4]],
          ...gameCards.slice(4, 8),
        ],
        [playersArr[(dealer + 3) % 4]]: [
          ...prev[playersArr[(dealer + 3) % 4]],
          ...gameCards.slice(8, 12),
        ],
        [playersArr[dealer % 4]]: [
          ...prev[playersArr[dealer % 4]],
          ...gameCards.slice(12, 16),
        ],
      };
    });

    if (round === 1) {
      setGameCards(gameCards.slice(16));
      setRound(2);
      return 1;
    } else if (round === 2) {
      setGameCards([]);
      setRound(1);
      return 0; // Changed it from 2 to 0
    }
  }

  return deal;
};

export default useDeal;
