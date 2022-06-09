import { createContext, useContext, useState } from "react";
import useStorage from "../hooks/useStorage";
import cards from "../utils/cards";
const Game = createContext();

export default function GameProvider({ children }) {
  const [game, setGame] = useStorage("29-card-game_game", {
    deck: cards.game,
    score: cards.score,
    table: [],
    players: { south: [], north: [], east: [], west: [] },
  });
  const [gameCards, setGameCards] = useState(game.deck);
  const [scoreCards, SetScoreCards] = useState(game.score);
  const [table, setTable] = useState([]);
  // console.log(gameCards);
  return (
    <Game.Provider
      value={{
        gameCards,
        setGameCards,
        scoreCards,
        SetScoreCards,
        table,
        setTable,
      }}
    >
      {children}
    </Game.Provider>
  );
}

export function GameState() {
  return useContext(Game);
}
