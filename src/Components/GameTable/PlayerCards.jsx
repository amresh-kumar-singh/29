import { useEffect, useState } from "react";
import playersArr from "../../utils/playersArr";
import "./tableStyle.css";

const PlayerCards = ({ player, card }) => {
  const [zIndex, setZIndex] = useState(6);

  useEffect(() => {
    // console.log(zIndex, "zindex");
    setZIndex((prev) => prev + 1);
  }, []);

  return (
    <div
      style={{ zIndex: zIndex, height: "24vmin" }}
      className={playersArr[player]}
    >
      {card && (
        <img
          src={`cards/Game/${card}.png`}
          alt={card && "29-Playing-Card-Game"}
          height="100%"
        />
      )}
    </div>
  );
};
export default PlayerCards;
