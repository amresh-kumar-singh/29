import "./cards.css";

const PlayerCards = ({ player, card }) => {
  return (
    <div style={{ zIndex: 6, height: "24vh" }} className={player}>
      <img
        src={`cards/Game/${card}.png`}
        alt="29-Playing-Card-Game"
        height="100%"
      />
    </div>
  );
};
export default PlayerCards;
