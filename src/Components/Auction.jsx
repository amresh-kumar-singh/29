import { useState } from "react";
import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";
import "./component.css";

let arr = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

const Auction = ({ setDisplayAuction }) => {
  const { call, setCall, dealer } = GameState();
  const [bidder, setBidder] = useState([(dealer + 1) % 4, (dealer + 2) % 4]);
  const [visited, setVisited] = useState([]);

  const handleCall = (item) => {
    setCall((prev) => {
      return {
        ...prev,
        call: item,
        caller: bidder[0],
      };
    });
    setBidder((prev) => [prev[1], prev[0]]);
  };

  const handlePass = () => {
    //bidder[0] is one who called pass
    setVisited((prev) => [...prev, bidder[0]]);
    console.log(bidder);
    if (bidder[0] === dealer || bidder[1] === dealer) {
      if (call.call < 16) {
        setCall({ call: 17, caller: dealer });
      }
      // Unmoundt Auction component
      console.log("Bidding Done");
      setDisplayAuction(0);
      return;
    }
    if (call.call < 16) {
      setBidder((prev) => [bidder[1], (bidder[1] + 1) % 4]);
      return;
    }
    if (
      (bidder[0] + 1) % 4 !== bidder[1] &&
      visited.indexOf((bidder[0] + 1) % 4) === -1
    ) {
      setBidder((prev) => [(bidder[0] + 1) % 4, bidder[1]]);
    } else if (visited.indexOf((bidder[1] + 1) % 4) === -1) {
      setBidder((prev) => [(bidder[1] + 1) % 4, bidder[1]]);
    }
  };
  return (
    <div className="auction">
      <span>{playersArr[bidder[0]]}</span>
      {arr.map((item) => {
        return (
          <span
            key={item}
            className={item <= call.call ? "visited" : ""}
            onClick={() => item > call.call && handleCall(item)}
          >
            {item}
          </span>
        );
      })}
      <span onClick={handlePass}>Pass</span>
    </div>
  );
};

export default Auction;
