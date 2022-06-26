import PlayerCards from "./PlayerCards";
import "./tableStyle.css";
import { GameState } from "../../context/game";
import { useEffect } from "react";
import useScore from "../../hooks/useScore";

const TableCards = () => {
  const { table } = GameState();
  const score = useScore();
  useEffect(() => {
    score();
  }, [table]);
  // if (table === null) return;
  return (
    <div className="table-cards">
      {table.map((item, index) => {
        return <PlayerCards card={item} player={index} key={index} />;
      })}
    </div>
  );
};
export default TableCards;
