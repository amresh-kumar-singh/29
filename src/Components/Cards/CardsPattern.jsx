import { ThemeState } from "../../context/theme";
import "./cardStyle.css";

const CardsPattern = ({ classCards }) => {
  const { theme } = ThemeState();
  // console.log(classCards);
  return (
    <div
      className={`pattern close ${theme.card} ${classCards}`}
      style={{
        width: "auto",
        height: "24vh",
        position: "absolute",
        top: "50%",
        overflow: "initial",
        // left: left,
        // cursor: left !== "64%" && "none",
        // boxShadow: left === "64%" && "rgb(88 54 99) -8px 4px 4px",
        transform: "translate(-7%, -50%) ",
      }}
    >
      {classCards === "trump" && <div className="title">Show</div>}
      <p
        className="text"
        // style={{
        //   position: "relative",
        //   top: "-20%",
        //   textTransform: "capitalize",
        // }}
      >
        {classCards}
      </p>
    </div>
  );
};

export default CardsPattern;
