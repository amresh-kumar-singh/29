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

function JackCount(cards) {
  // cards can be all cards
  return cards.filter((item) => item[0] === "J");
}

const useBot = () => {
  const {
    table,
    color: [colorStatus, colorCard],
    players,
    setColor,
    initialPlayer,
  } = GameState();
  const turn = useTurn();

  // Make a function for possible cards to play
  const bot = (player) => {
    if (table.filter((item) => item).length === 4) {
      console.log("Table is Full");
      return player;
    }

    const handCards = players[playersArr[player]];
    console.log(table, "Table :: for Player:", player, "has: ", handCards);
    if (table.length === 0) {
      //Check if Player has JACK
      const JackCards = JackCount(handCards);
      // console.log("looking of J", JackCards);
      if (JackCards.length > 0) {
        turn(player, JackCards[0]);
      } else {
        //Just for testing
        turn(player, handCards[0]);
      }
      return player;
    }
    //Our table has some defect logic table .initial player location can be empty
    // lets make table object
    const gameCard = table[initialPlayer];
    // console.log(
    //   "Initial Player:",
    //   initialPlayer,
    //   "gamecard: ",
    //   gameCard,
    //   "player: ",
    //   player
    // );
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
        (item) => item && item[1] === colorCard[1]
      );
      //Color
      const _playerColorCards = handCards.filter(
        (item) => item[1] === colorCard[1]
      );
      !colorStatus && setColor((prev) => [true, prev[1]]);
      //Player Doesn't have color or color is not shown
      if (_playerColorCards.length === 0) {
        //Testing purpose
        // console.log("colorPlay:", handCards[0]);
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
    // console.log("Player: ", player, "going to paly: ", _playCard);
    turn(player, _playCard);
    return player;
  };

  return bot;
};

export default useBot;
