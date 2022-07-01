import { useState } from "react";
import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";
import points from "../utils/points";
let arr = ["7", "8", "Q", "K", "1", "A", "9", "J"];

const getMaxArr = (cards) => {
  let obj = {};
  for (let i in cards) {
    console.log(obj[cards[i][1]], cards[i], cards);
    obj[cards[i][1]] = obj[cards[i][1]]
      ? [obj[cards[i][1]][0] + 1, obj[cards[i][1]][1] + points[cards[i][0]]] //no of cards[i]s of same color,point total
      : [1, points[cards[i][0]]];
  }
  //   console.log("getmax :obj", obj);
  for (let item in obj) {
    console.log("inside for loogp", item, obj[item], obj, obj[item][0]);
    if (obj[item][0] >= 2 && obj[item][1] >= 3) {
      let noOfCardsValue = obj[item][0] - 2;
      let maxCall = 17 + noOfCardsValue + obj[item][1] - 3;
      return [item, maxCall]; //[Color_to_made, maximum no to call]
    }
  }
  return [0, 0]; //Can't make color
};

const useBotColor = () => {
  const { players } = GameState();
  const [maxCache, setMaxCache] = useState([]); //once called colorpicker than cache

  const colorPicker = (player) => {
    console.log("may be from cache", playersArr[player]);
    if (maxCache[player]) return maxCache[player];
    let cards = players[playersArr[player]];
    let choice = getMaxArr(cards);
    console.log(playersArr[player], " choice: ", choice);
    setMaxCache((prev) => {
      prev[player] = choice;
      return [...prev];
    });
    return choice;
  };

  const colorType = (player) => {
    console.log("Max Cache", maxCache);
    if (maxCache[player] === undefined) return "7th";
    if (maxCache[player][0] === 0) return "7th";
    console.log("returnType: ", 2 + maxCache[player][0]);
    return 2 + maxCache[player][0];
  };
  const clearBotColor = () => {
    setMaxCache([]);
  };
  return { colorPicker, colorType, clearBotColor };
};

export default useBotColor;
