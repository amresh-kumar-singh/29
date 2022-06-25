import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
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
  const [yourTeam, setYourTeam] = useState({ point: 0, score: 6 });
  const [opponentTeam, setOpponentTeam] = useState({ point: 0, score: 4 });
  const [call, setCall] = useState({ call: -1, caller: -1 }); //auction and bid
  const [dealer, setDealer] = useState(0);
  const [initialPlayer, setInitialPlayer] = useState(0);
  const [color, setColor] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  // console.log(dealer, initialPlayer);
  // const bot = useBot();

  useEffect(() => {
    setInitialPlayer((dealer + 1) % 4);
  }, [dealer]);

  useEffect(() => {
    // flushSync(() => {
    // setTable([]);
    // });
    console.log("from inital player: change", currentPlayer, initialPlayer);
    setCurrentPlayer(initialPlayer);
  }, [initialPlayer]);

  //Bot

  // console.log(players, "player");
  return (
    <Game.Provider
      value={{
        color,
        setColor,
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
        currentPlayer,
        setCurrentPlayer,
      }}
    >
      {children}
    </Game.Provider>
  );
}

export function GameState() {
  return useContext(Game);
}
