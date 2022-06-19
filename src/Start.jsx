import("./start.css");
function Start() {
  return (
    <div className="start">
      <main>
        <button className="btn">
          <span>Resume</span>
        </button>
        <button className="btn">New Game</button>
        <button className="btn">Start</button>
        <button className="btn">Help</button>
        <button className="btn">Credits</button>
      </main>
    </div>
  );
}

export default Start;
