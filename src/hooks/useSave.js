import { useEffect, useRef } from "react";
import { GameState } from "../context/game";

const useSave = () => {
  const {
    setGame,
    table,
    players,
    opponentTeam,
    yourTeam,
    dealer,
    initialPlayer,
    currentPlayer,
    color,
    call,
    gameCards,
  } = GameState();
  const timer = useRef(false);
  function save() {
    setGame((prev) => {
      return {
        ...prev,
        deck: gameCards,
        table: table,
        players: players,
        teams: { yourTeam, opponentTeam, call },
        tableStatus: { dealer, initialPlayer, currentPlayer, color },
      };
    });
  }
  useEffect(() => {
    if (color[1]) {
      timer.current = setTimeout(() => {
        save();
      }, 500);
    }
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line
  }, [currentPlayer]);
  return save;
};

export default useSave;
