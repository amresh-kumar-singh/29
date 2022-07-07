import points from "./points";
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
  return cards.filter((item) => item[0] === "J");
}

//this will return card which has maximum length
const maxNoCards = (cards) => {
  let obj = {};
  for (let i in cards) {
    //{C:[number, point]}
    obj[cards[i][1]] = obj[cards[i][1]]
      ? [obj[cards[i][1]][0] + 1, obj[cards[i][1]][1] + points[cards[i][0]]] //no of cards[i]s of same color,point total
      : [1, points[cards[i][0]]];
  }
  let minLength = 0; //first will check no of cards then will check points on those cards
  let minPoints;
  let max = 0;
  for (let i in obj) {
    if (obj[i][0] >= minLength) {
      if (obj[i][0] === minLength && minPoints > obj[i][1]) {
        minLength = obj[i][0];
        minPoints = obj[i][1];
        max = i;
      } else {
        minLength = obj[i][0];
        minPoints = obj[i][1];
        max = i;
      }
    }
  }
  // console.log(minLength, "min max", max);
  return max; //return C S H D
};

export { minMaxCards, JackCount, maxNoCards };
