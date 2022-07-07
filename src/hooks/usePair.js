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
  } = GameState();

  useEffect(() => {
    if (colorStatus) {
      //check who has pair
      const playerWithPair = checkPair(players, colorCard);
      if (playerWithPair) {
        const index = playersArr.indexOf(playerWithPair);
        if (index === call.caller || (index + 2) % 4 === call.caller) {
          setCall((prev) => {
            return {
              ...prev,
              call: prev.call > 20 ? prev.call - 3 : 17,
            };
          });
        } else {
          setCall((prev) => {
            return {
              ...prev,
              call: prev.call + 3,
            };
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [colorStatus]);
};
export default usePair;
