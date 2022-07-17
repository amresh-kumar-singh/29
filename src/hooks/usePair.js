import { useEffect } from "react";
import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";

function checkPair(obj, color) {
  for (let i in obj) {
    let arrPair = obj[i].filter(
      (card) =>
        (card[1] === color[1] && card[0] === "K") ||
        (card[1] === color[1] && card[0] === "Q")
    );
    if (arrPair.length === 2) return i;
  }
  return false;
}
const usePair = () => {
  const {
    players,
    color: [colorStatus, colorCard],
    call,
    setCall,
    pairHolder,
    setPairHolder,
    currentPlayer,
    table,
  } = GameState();

  useEffect(() => {
    if (colorStatus && !pairHolder) {
      //check who has pair
      let playersWithTable = {
        ...players,
        [playersArr[currentPlayer[0]]]: table[currentPlayer[0]]
          ? [...players[playersArr[currentPlayer[0]]], table[currentPlayer[0]]]
          : [...players[playersArr[currentPlayer[0]]]],
      };
      const playerWithPair = checkPair(playersWithTable, colorCard);
      if (playerWithPair) {
        const index = playersArr.indexOf(playerWithPair);
        if (index === call.caller || (index + 2) % 4 === call.caller) {
          setCall((prev) => {
            return {
              ...prev,
              call: prev.call > 20 ? prev.call - 3 : 17,
            };
          });
          setPairHolder(0 + playerWithPair);
        } else {
          setCall((prev) => {
            return {
              ...prev,
              call: prev.call + 3,
            };
          });
          setPairHolder(1 + playerWithPair);
        }
      }
    }
    // eslint-disable-next-line
  }, [colorStatus]);
};
export default usePair;
