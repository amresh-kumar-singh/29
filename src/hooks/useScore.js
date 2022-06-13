import { useEffect } from "react";
import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";
import points from "../utils/points";
let arr = ["7", "8", "Q", "K", "1", "A", "9", "J"];

const useScore = () => {
  const {
    table,
    call,
    setTable,
    setOpponentTeam,
    setYourTeam,
    initialPlayer,
    setInitialPlayer,
    setGameCards,
    opponentTeam,
    yourTeam,
    dealer,
    setDealer,
    players,
    setPlayers,
    setCall,
  } = GameState();

  // Change of Score Put all cards in gameCards

  function newGame() {
    // console.log(
    //   players[playersArr[(dealer + 1) % 4]],
    //   players[playersArr[(dealer + 2) % 4]],
    //   players[playersArr[(dealer + 3) % 4]],
    //   players[playersArr[(dealer + 4) % 4]],
    //   "prev dealer:",
    //   dealer
    // );
    console.log("New Game started");
    // return;
    setGameCards((prev) => {
      return [
        ...prev,
        ...players[playersArr[(dealer + 1) % 4]],
        ...players[playersArr[(dealer + 2) % 4]],
        ...players[playersArr[(dealer + 3) % 4]],
        ...players[playersArr[(dealer + 4) % 4]],
      ];
    });
    setPlayers({ south: [], north: [], east: [], west: [] });
    setDealer((prev) => (prev + 1) % 4);
    setCall({ call: -1, caller: -1 });
    // setInitialPlayer((prev) => (dealer + 1) % 4);
  }

  // useEffect(() => {
  //   newGame();
  // }, [opponentTeam.score, yourTeam.score]);
  useEffect(() => {
    //Players game
    if (call.caller === 0 || call.caller === 2) {
      if (opponentTeam.point > 28 - call.call) {
        newGame();
        console.log("Losser----->YOU");
        setYourTeam((prev) => {
          return {
            ...prev,
            score: prev.score - 1,
            point: 0,
          };
        });
        setOpponentTeam((prev) => {
          return {
            ...prev,
            point: 0,
          };
        });
      } else if (yourTeam.point >= call.call && yourTeam.point > 16) {
        console.log("Winner----->YOU");
        newGame();
        setYourTeam((prev) => {
          return {
            ...prev,
            score: prev.score + 1,
            point: 0,
          };
        });
        setOpponentTeam((prev) => {
          return {
            ...prev,
            point: 0,
          };
        });
      }
    }
    // eslint-disable-next-line
  }, [yourTeam.point, opponentTeam.point]);

  useEffect(() => {
    //Opponent game
    if (call.caller === 1 || call.caller === 3) {
      if (yourTeam.point > 28 - call.call) {
        console.log("Losser----->OPPONENT");
        newGame();
        setOpponentTeam((prev) => {
          return {
            ...prev,
            score: prev.score - 1,
            point: 0,
          };
        });
        setYourTeam((prev) => {
          return {
            ...prev,
            point: 0,
          };
        });
      } else if (opponentTeam.point >= call.call && opponentTeam.point > 16) {
        console.log("Winner----->OPPONENT");
        newGame();
        setOpponentTeam((prev) => {
          return {
            ...prev,
            score: prev.score + 1,
            point: 0,
          };
        });
        setYourTeam((prev) => {
          return {
            ...prev,
            point: 0,
          };
        });
      }
    }
    // eslint-disable-next-line
  }, [opponentTeam.point, yourTeam.point]);

  //Calculating Points------------------------------------------
  function score() {
    if (table.filter((item) => item).length === 4) {
      let winner = 0;
      let tempWinner = -1;
      let temp = table.reduce((acc, item, i) => {
        if (
          arr.indexOf(item[0]) > tempWinner &&
          table[initialPlayer][1] === item[1]
        ) {
          tempWinner = arr.indexOf(item[0]);
          winner = i;
        }
        return points[item[0]] + acc;
      }, 0);

      if (winner === 0 || winner === 2) {
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
      // console.log(winner, initialPlayer);
    }
  }

  return score;
};
export default useScore;
