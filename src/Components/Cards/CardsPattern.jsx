import { ThemeState } from "../../context/theme";
import BlockIcon from "@mui/icons-material/Block";
import "./cardStyle.css";
import { memo } from "react";

const CardsPattern = ({ classCards, cover, onPointerUp, src, number }) => {
  const { theme } = ThemeState();

  return (
    <>
      <p className={`text ${classCards}Text`}>{classCards}</p>
      <div className={`card ${classCards}`}>
        <img
          src={`cards/Score/${src}.png`}
          height="100%"
          style={{
            position: "absolute",
            left: 0,
          }}
        ></img>
        <div
          className={`pattern close ${theme.card} score${Math.abs(number)}`}
          style={{
            position: "absolute",
            height: "100%",
            left: 0,

            ...(cover && cover[0] != 6
              ? {
                  background: "none",
                  backgroundSize: "cover",
                  backgroundImage: `url(cards/Score/${cover}.png)`,
                }
              : { boxSizing: "border-box", border: ".8vw solid white" }),
          }}
          onPointerUp={onPointerUp}
        >
          {classCards === "trump" && (
            <div className="title">
              {cover ? "Show" : <BlockIcon color="error" fontSize="large" />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(CardsPattern);
