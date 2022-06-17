import { useState } from "react";
import { useEffect } from "react";
import { GameState } from "../../context/game";
import { ThemeState } from "../../context/theme";
import "./cardStyle.css";

const CardsPattern = ({ classCards }) => {
  const { theme } = ThemeState();
  const { opponentTeam, yourTeam } = GameState();
  //number[0]--multiple, number[1]--remainder
  const [number, setNumber] = useState([0, 0]);
  const [type, setType] = useState();
  const [cover, setCover] = useState(6);

  useEffect(() => {
    if (classCards === "player") {
      console.log("player score", yourTeam.score);
      setNumber((prev) => [(yourTeam.score / 6) | 0, yourTeam.score % 6]);
      yourTeam.score >= 0 ? setType("H") : setType("S");
    }
    if (classCards === "opponent") {
      setNumber((prev) => [
        (opponentTeam.score / 6) | 0,
        opponentTeam.score % 6,
      ]);
      opponentTeam.score >= 0 ? setType("D") : setType("C");
    }
  }, [opponentTeam.score, yourTeam.score]);

  useEffect(() => {
    console.log("ran from Number[0]", number);
    setCover(6 - Math.abs(number[0]));
  }, [number[0]]);

  return (
    <>
      <p className={`text ${classCards}Text`}>{classCards}</p>
      <div className={`card ${classCards}`}>
        <img
          src={
            classCards === "trump"
              ? "cards/Score/red_joker.png"
              : `cards/Score/6${type}.png`
          }
          height="100%"
          style={{
            position: "absolute",
            left: 0,
          }}
        ></img>
        <div
          className={`pattern close ${theme.card} score${Math.abs(number[1])}`}
          style={{
            position: "absolute",
            height: "100%",
            left: 0,
            weight: "100%",
            boxSizing: cover === 6 ? "border-box" : "",
            border: cover === 6 ? ".8vw solid white" : "",
            background: cover < 6 ? `url(cards/Score/${cover}${type}.png)` : "",
            backgroundSize: cover < 6 ? "cover" : "",
          }}
        >
          {classCards === "trump" && <div className="title">Show</div>}
        </div>
        {/* <p className="text">{classCards}</p> */}
      </div>
    </>
  );
};

export default CardsPattern;
