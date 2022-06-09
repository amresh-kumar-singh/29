import { GameState } from "../context/game";

const useShuffle = () => {
  const { gameCards, setGameCards } = GameState();

  function shuffle() {
    let _deck = gameCards.slice();

    let times =
      ((crypto.getRandomValues(new Uint32Array(1))[0] / Math.pow(2, 32)) * 10) |
      0;

    function innerSuffle(arr, times) {
      if (times === 0) {
        return arr;
      }

      let rand =
        ((crypto.getRandomValues(new Uint32Array(1))[0] / Math.pow(2, 32)) *
          arr.length) | // arr.length each recursion will reduce
        0;

      let front = arr.slice(0, rand);
      let rear = arr.slice(rand);

      if (front.length > rear.length) {
        console.log(`front: ${front.length} rand ${rand}`);
        return [...rear, ...innerSuffle(front, times - 1)];
      } else {
        console.log(`rear: ${rear.length} rand ${rand}`);
        return [...innerSuffle(rear, times - 1), ...front];
      }
    }
    let deck = innerSuffle(_deck, times);

    setGameCards(deck);
    return deck;
  }

  return shuffle;
};

export default useShuffle;
