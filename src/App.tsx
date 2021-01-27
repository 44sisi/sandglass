import React, { useState } from "react";
import Button from "./components/Button";
import Time from "./components/Time";
import { ReactComponent as Play } from "./icons/play.svg";
import { ReactComponent as Pause } from "./icons/pause.svg";
import { ReactComponent as Reset } from "./icons/reset.svg";

function App() {
  const totalRound = 5,
    totalExercise = 5,
    exerciseTime = 30,
    breakTime = 60;
  const totalTime = (exerciseTime * totalExercise + breakTime) * totalRound;

  const [playing, setPlaying] = useState(false);

  const currentRound = 1,
    currentExercise = 1,
    elapsed = 0,
    currentElapsed = 0,
    exercise = true;

  const remaining = totalTime - elapsed,
    countdown = (exercise ? exerciseTime : breakTime) - currentElapsed;

  function playOnClick() {
    setPlaying(!playing);
  }

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
              <Pause onClick={playOnClick}></Pause>
            </Button>
          ) : (
            <Button>
              <Play onClick={playOnClick}></Play>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
