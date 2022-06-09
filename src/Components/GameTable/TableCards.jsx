import PlayerCards from "./PlayerCards";
import "./cards.css";
import { useEffect, useState } from "react";
import { GameState } from "../../context/game";

const TableCards = () => {
  const { table } = GameState();

  return (
    <div className="table">
      <PlayerCards player="south" card={table[0]} />
      <PlayerCards player="west" card={table[1]} />
      <PlayerCards player="north" card={table[2]} />
      <PlayerCards player="east" card={table[3]} />
    </div>
  );
};
export default TableCards;
