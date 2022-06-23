import { useState, useEffect } from "react";
import { GameState } from "../../context/game";
import { ThemeState } from "../../context/theme";
import playersArr from "../../utils/playersArr";

import "./cardStyle.css";

const CardsPattern = ({ classCards, cover, onClick, src, number }) => {
  const { theme } = ThemeState();
  // const {
  //   opponentTeam,
  //   yourTeam,
  //   players,
  //   currentPlayer,
  //   initialPlayer,
  //   table,
  //   color,
  // } = GameState();
  // //number[0]--multiple, number[1]--remainder
  // const [number, setNumber] = useState([0, 0]);
  // const [type, setType] = useState();
  // const [cover, setCover] = useState(null);

  // useEffect(() => {
  //   if (classCards === "player") {
  //     console.log("player score", yourTeam.score);
  //     setNumber((prev) => [(yourTeam.score / 6) | 0, yourTeam.score % 6]);
  //     yourTeam.score >= 0 ? setType((prev) => "H") : setType((prev) => "S");
  //   }
  // }, [yourTeam.score]);
  console.log("render", classCards, cover);
  // useEffect(() => {
  //   if (classCards === "opponent") {
  //     setNumber((prev) => [
  //       (opponentTeam.score / 6) | 0,
  //       opponentTeam.score % 6,
  //     ]);
  //     opponentTeam.score >= 0 ? setType((prev) => "D") : setType((prev) => "C");
  //   }
  // }, [opponentTeam.score]);
  // useEffect(() => {
  //   console.log("ran from Number[0]", number);
  //   setCover(6 - Math.abs(number[0]) + type);
  // }, [number[0]]);

  // const handleShow = () => {
  //   if (classCards === "trump") {
  //     //TODO player is current player also for
  //     if (
  //       players[playersArr[currentPlayer]].filter(
  //         (item) => item[1] === table[initialPlayer][1]
  //       ).length === 0
  //     ) {
  //       setCover(color);
  //     }
  //   }
  // };

  return (
    <>
      <p className={`text ${classCards}Text`}>{classCards}</p>
      <div className={`card ${classCards}`}>
        <img
          src={
            `cards/Score/${src}.png`
            // classCards === "trump"
            //   ? "cards/Score/red_joker.png"
            //   : `cards/Score/6${type}.png`
          }
          height="100%"
          style={{
            position: "absolute",
            left: 0,
          }}
        ></img>
        <div
          // className={`pattern close ${theme.card} score${Math.abs(number[1])}`}
          className={`pattern close ${theme.card} score${Math.abs(number)}`}
          style={{
            position: "absolute",
            height: "100%",
            left: 0,
            // weight: "100%",
            // boxSizing: cover[0] === 6 ? "border-box" : "",
            // border: cover[0] === 6 ? ".8vw solid white" : "",
            // background:
            //   cover && cover[0] < 6
            //     ? `url(cards/Score/${cover}.png)`
            //     : classCards === "trump" && color === cover
            //     ? `url(cards/Score/${cover}.png)`
            //     : "",

            ...(cover
              ? {
                  // boxSizing: !cover ? "border-box" : "",
                  // border: !cover ? ".8vw solid white" : "",
                  // border: "0",
                  // boxSizing: "",
                  backgroundSize: "cover",
                  backgroundImage: `url(cards/Score/${cover}.png)`,
                }
              : { boxSizing: "border-box", border: ".8vw solid white" }),

            // backgroundSize: cover[0] < 6 || cover === color ? "cover" : "",
          }}
          onClick={onClick}
        >
          {/* {classCards === "trump" && cover !== color && (
            <div className="title">Show</div>
          )} */}
          {classCards === "trump" && <div className="title">Show</div>}
        </div>
        {/* <p className="text">{classCards}</p> */}
      </div>
    </>
  );
};

export default CardsPattern;
