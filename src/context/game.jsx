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
    teams: {
      yourTeam: { point: 0, score: -5, colorScore: 1 },
      opponentTeam: { point: 0, score: 5, colorScore: -1 },
      call: { call: -1, caller: -1 },
    },
    tableStatus: {
      dealer: 0,
      initialPlayer: 1,
      currentPlayer: [1],
      color: [false, ""],
    },
  });
  const [gameCards, setGameCards] = useState(game.deck);
  const [scoreCards, SetScoreCards] = useState(game.score);
  const [table, setTable] = useState(() =>
    game.table.map((item) => (item ? item : undefined))
  );
  const [players, setPlayers] = useState(game.players);
  const [yourTeam, setYourTeam] = useState(game.teams.yourTeam);
  const [opponentTeam, setOpponentTeam] = useState(game.teams.opponentTeam);
  const [call, setCall] = useState(game.teams.call); //auction and bid
  const [dealer, setDealer] = useState(game.tableStatus.dealer);
  const [initialPlayer, setInitialPlayer] = useState(
    game.tableStatus.initialPlayer
  );
  const [color, setColor] = useState(game.tableStatus.color);
  const [currentPlayer, setCurrentPlayer] = useState(
    game.tableStatus.currentPlayer
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    //here can give mounted
    mounted && setInitialPlayer((dealer + 1) % 4);
  }, [dealer]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    if (table === null || table.filter((item) => item).length === 4) {
      // console.log("length 44444", table);
      return;
    }
    if (table.length === 0) {
      setCurrentPlayer([initialPlayer]);
      // console.log("table changed--table length 0", table);
    } else {
      // console.log("prev current ", currentPlayer);
      setCurrentPlayer((prev) => [(prev[0] + 1) % 4]);
      // console.log("table changed--", table);
    }
  }, [table]);

  return (
    <Game.Provider
      value={{
        color,
        setColor,
        gameCards,
        setGameCards,
        scoreCards,
        SetScoreCards,
        setGame,
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
