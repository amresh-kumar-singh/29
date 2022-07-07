import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";
import useTurn from "./useTurn";
import { minMaxCards, maxNoCards, JackCount } from "../utils/botHelper";

let arr = ["7", "8", "Q", "K", "1", "A", "9", "J"];

const useBot = () => {
  const {
    table,
    color: [colorStatus, colorCard],
    players,
    setColor,
    initialPlayer,
    call,
  } = GameState();
  const turn = useTurn();

  //-----------------------------------------------------------------------------------
  const bot = (player) => {
    let _playCard;
    const inHandCards = players[playersArr[player]];

    if (table.length === 0) {
      const JackCards = JackCount(inHandCards);
      if (JackCards.length > 0) {
        _playCard =
          colorStatus &&
          JackCards.length > 1 &&
          JackCards[0][1] === colorCard[1]
            ? JackCards[1]
            : JackCards[0];
      } else {
        const _maxNoCards = maxNoCards(inHandCards);
        const [playerMin] = minMaxCards(
          inHandCards.filter((item) => item[1] === _maxNoCards)
        );
        _playCard = playerMin;
      }
    } else {
      const gameCard = table[initialPlayer];
      const playerGameCards = inHandCards.filter(
        (item) => gameCard[1] === item[1]
      );
      const [, tableGameMax] = minMaxCards(
        table.filter((item) => item && item[1] === gameCard[1])
      );
      if (playerGameCards.length > 0) {
        let colorMaxOnTable;
        // if ColorStatus is true and not game of color
        if (colorStatus && gameCard[1] !== colorCard[1]) {
          let temp = table.filter((item) => item && item[1] === colorCard[1]);
          if (temp.length > 0) {
            const [, tableMax] = minMaxCards(temp);
            colorMaxOnTable = tableMax;
          }
        }
        const [playerMin, playerMax] = minMaxCards(playerGameCards);
        if (colorMaxOnTable) {
          _playCard =
            table.indexOf(colorMaxOnTable) === (player + 2) % 4
              ? playerMax
              : playerMin;
        } else {
          _playCard =
            arr.indexOf(tableGameMax[0]) > arr.indexOf(playerMax[0])
              ? table.indexOf(tableGameMax) === (player + 2) % 4 &&
                tableGameMax[0] === "J" &&
                ((!colorStatus && call.caller !== player) ||
                  (colorStatus && colorCard[1] !== playerMin[1]))
                ? playerMax
                : playerMin
              : playerMax;
        }
      } else {
        // check color status if false true !statusColor && setStausColor(true)
        let asker;
        const _tableColorCards = table.filter(
          (item) => item && item[1] === colorCard[1]
        );
        const _playerColorCards = inHandCards.filter(
          (item) => item[1] === colorCard[1]
        );

        if (!colorStatus) {
          asker = true;
          setColor((prev) => [true, prev[1]]);
        }

        const [tableColorMin, tableColorMax] =
          _tableColorCards.length > 0 ? minMaxCards(_tableColorCards) : [0, 0]; //Since table length can be 0
        const _maxOtherNoCards = maxNoCards(
          inHandCards.filter((item) => item[1] !== colorCard[1])
        ); //playercard without color
        const [otherMin, otherMax] = minMaxCards(
          _maxOtherNoCards === 0
            ? inHandCards
            : inHandCards.filter((item) => item[1] === _maxOtherNoCards)
        );
        //Player Doesn't have color or color is not shown or joker is color
        if (_playerColorCards.length === 0) {
          _playCard =
            tableColorMax !== 0 // Table has color
              ? table.indexOf(tableColorMax) === (player + 2) % 4 //TeamMate has highest color card
                ? otherMax
                : otherMin //color on table and teammate has max
              : table.indexOf(tableGameMax) === (player + 2) % 4
              ? otherMax
              : otherMin;
        } else {
          const [playerColorMin, playerColorMax] =
            minMaxCards(_playerColorCards);
          _playCard =
            tableColorMin !== 0 //color on table
              ? table.indexOf(tableColorMax) === (player + 2) % 4
                ? otherMax //table max teamMate or player max small than table
                : arr.indexOf(tableColorMax[0]) > arr.indexOf(playerColorMax[0])
                ? otherMin
                : playerColorMax
              : table.indexOf(tableGameMax) === (player + 2) % 4 && !asker
              ? otherMax
              : playerColorMin;
        }
      }
    }
    turn(player, _playCard);
    return player;
  };
  return bot;
};

export default useBot;
