import { useEffect } from "react";
import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";
import useTurn from "./useTurn";
let arr = ["7", "8", "Q", "K", "1", "A", "9", "J"];

//Function to get max card and min card of same color
function minMaxCards(array) {
  const valueArr = array.map((item) => arr.indexOf(item[0]));

  return [
    arr[Math.min(...valueArr)] + array[0][1],
    arr[Math.max(...valueArr)] + array[0][1],
  ];
}
let timer;

const useBot = () => {
  const { table, color, players, initialPlayer, currentPlayer } = GameState();
  const turn = useTurn();
  // Make a function for possible cards to play
  const bot = (player) => {
    console.log(table, "from bot");
    const handCards = players[playersArr[player]];
    if (table.length === 0) {
      console.log("Initial Play: ", handCards[0]);
      //Just for testing
      turn(player, handCards[0]);
      return;
    }
    //Our table has some defect logic table .initial player location can be empty
    // lets make table object
    const gameCard = table[initialPlayer];
    console.log(" in", initialPlayer, "gamecard", gameCard, "player", player);
    const playerGameCards = handCards.filter((item) => gameCard[1] === item[1]);
    // const priority = (player + initialPlayer)/2===0

    // In case bot is first one to play
    let _playCard;
    //if player has same card[1] as game card[1]
    if (playerGameCards.length > 0) {
      // Check value of game card and decide what to play
      //Get max on table
      const [tableMin, tableMax] = minMaxCards(table.filter((item) => item));
      const [playerMin, playerMax] = minMaxCards(playerGameCards);
      // console.log("table", tableMax, tableMin);
      // console.log("player", playerMax, playerMin);
      _playCard =
        arr.indexOf(tableMax[0]) > arr.indexOf(playerMax[0])
          ? playerMin
          : playerMax;
    } else {
      // check color status if false true !statusColor && setStausColor(true)
      //color card on table
      const _tableColorCards = table.filter(
        (item) => item && item[1] === color[1]
      );
      const _playerColorCards = handCards.filter(
        (item) => item[1] === color[1]
      );

      //Player Doesn't have color
      if (_playerColorCards.length === 0) {
        //Testing purpose
        console.log("colorPlay:", handCards[0]);
        turn(player, handCards[0]);
        return;
      }
      const [tableMin, tableMax] =
        _tableColorCards.length > 0 ? minMaxCards(_tableColorCards) : [0, 0]; //Since table length can be 0
      const [playerMin, playerMax] = minMaxCards(_playerColorCards);
      // console.log("tableCOLOR", tableMax, tableMin);
      // console.log("playerCOLOR", playerMax, playerMin);
      _playCard =
        tableMin[0] !== 0 &&
        arr.indexOf(tableMax[0]) < arr.indexOf(playerMax[0])
          ? playerMax
          : playerMin;
    }
    console.log("going to paly: ", _playCard);
    turn(player, _playCard);
    return;
  };

  // useEffect(() => {
  //   console.log("inside bot useffect", currentPlayer, initialPlayer, table);
  //   if (
  //     currentPlayer !== 0 &&
  //     table !== undefined &&
  //     players[playersArr[currentPlayer]].length !== 0
  //   ) {
  //     console.log(currentPlayer);
  //     timer = setTimeout(() => {
  //       bot(currentPlayer);
  //     }, 1500);
  //   }

  //   return () => clearTimeout(timer);
  //   //what if current player is same as initial player
  // }, [currentPlayer]);

  return bot;
};

export default useBot;
