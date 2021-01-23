import React from "react";
import Button from "./components/Button";
import Time from "./components/Time";
import { ReactComponent as Play } from "./icons/play.svg";
import { ReactComponent as Pause } from "./icons/pause.svg";
import { ReactComponent as Reset } from "./icons/reset.svg";

function App() {
  return (
    <div className="App">
      <Time seconds={100}></Time>
      <Button>
        <Play></Play>
      </Button>
      <Button>
        <Pause></Pause>
      </Button>
      <Button>
        <Reset></Reset>
      </Button>
    </div>
  );
}

export default App;
