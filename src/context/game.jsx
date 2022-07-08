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
      yourTeam: { point: 0, score: 0, colorScore: 0 },
      opponentTeam: { point: 0, score: 0, colorScore: 0 },
      call: { call: -1, caller: -1 },
    },
    tableStatus: {
      dealer: 0,
      initialPlayer: 1,
      currentPlayer: [1],
      color: [false, ""],
    },
  });
  const [gameCards, setGameCards] = useState([...new Set(game.deck)]);
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
    // eslint-disable-next-line
  }, [dealer]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    if (table === null || table.filter((item) => item).length === 4) {
      return;
    }
    if (table.length === 0) {
      setCurrentPlayer([initialPlayer]);
    } else {
      setCurrentPlayer((prev) => [(prev[0] + 1) % 4]);
    }
    // eslint-disable-next-line
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
