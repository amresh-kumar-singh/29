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

  useEffect(() => {
    if (color[1]) {
      timer.current = setTimeout(() => {
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
      }, 2000);
    }
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line
  }, [currentPlayer]);
};

export default useSave;
