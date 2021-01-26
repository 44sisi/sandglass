import React from "react";
import Button from "./components/Button";
import Time from "./components/Time";
import { ReactComponent as Play } from "./icons/play.svg";
import { ReactComponent as Pause } from "./icons/pause.svg";
import { ReactComponent as Reset } from "./icons/reset.svg";

function App() {
  const currentRound = 1,
    totalRound = 5;
  const currentExercise = 1,
    totalExercise = 5;
  const elapsed = 100,
    remaining = 100,
    countdown = 100;
  const playing = false;

  return (
    <div className="app">
      <div className="countdown">
        <Time seconds={countdown}></Time>
      </div>

      <div className="flex-row time-row">
        <div className="text-center">
          <div className="label">ELAPSED</div>
          <div className="content">
            <Time seconds={elapsed}></Time>
          </div>
        </div>

        <div className="text-center">
          <div className="label">EXERCISES</div>
          <div className="content">{`${currentExercise} / ${totalExercise}`}</div>
        </div>

        <div className="text-center">
          <div className="label">REMAINING</div>
          <div className="content">
            <Time seconds={remaining}></Time>
          </div>
        </div>
      </div>

      <div className="flex-row control-row">
        <div className="left-button">
          <Button>
            <Reset></Reset>
          </Button>
        </div>

        <div className="text-center rounds">
          <span>ROUNDS: </span>
          <span>{`${currentRound} / ${totalRound}`}</span>
        </div>

        <div className="right-button">
          {playing ? (
            <Button>
              <Pause></Pause>
            </Button>
          ) : (
            <Button>
              <Play></Play>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
