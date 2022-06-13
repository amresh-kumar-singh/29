import { createContext, useContext, useEffect, useState } from "react";
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
  const [table, setTable] = useState(game.table);
  const [players, setPlayers] = useState(game.players);
  const [yourTeam, setYourTeam] = useState({ point: 0, score: 1 });
  const [opponentTeam, setOpponentTeam] = useState({ point: 0, score: -7 });
  const [call, setCall] = useState({ call: -1, caller: -1 }); //authion and bid
  const [dealer, setDealer] = useState(0);
  const [initialPlayer, setInitialPlayer] = useState(0);
  console.log(dealer, initialPlayer);

  useEffect(() => {
    setInitialPlayer((dealer + 1) % 4);
  }, [dealer]);

  return (
    <Game.Provider
      value={{
        gameCards,
        setGameCards,
        scoreCards,
        SetScoreCards,
        table,
        setTable,
        players,
        setPlayers,
        yourTeam,
        setYourTeam,
        opponentTeam,
        setOpponentTeam,
        initialPlayer,
        setInitialPlayer,
        call,
        setCall,
        dealer,
        setDealer,
      }}
    >
      {children}
    </Game.Provider>
  );
}

export function GameState() {
  return useContext(Game);
}
