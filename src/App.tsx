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
    restTime = 60;

  const [playing, setPlaying] = useState(false);
  const [rest, setRest] = useState(false);
  const [countdown, setCountdown] = useState(rest ? restTime : exerciseTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(1);

  const roundTIme = exerciseTime * totalExercise + restTime;
  const totalTime = roundTIme * totalRound;
  const remaining =
    countdown +
    exerciseTime * (totalExercise - currentExercise) +
    (rest ? 0 : restTime) +
    roundTIme * (totalRound - currentRound);

  function resetOnClick() {
    setPlaying(false);
  }

  function playOnClick() {
    setPlaying(true);
    var currentTimeLeft = countdown;
    var countdownTimer = setInterval(function () {
      currentTimeLeft--;
      setCountdown(currentTimeLeft);
      if (currentTimeLeft <= 0) clearInterval(countdownTimer);
    }, 1000);
  }

  function pauseOnClick() {
    setPlaying(false);
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
            <Time seconds={totalTime - remaining}></Time>
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
          <Button onClick={resetOnClick}>
            <Reset></Reset>
          </Button>
        </div>

        <div className="text-center rounds">
          <span>ROUNDS: </span>
          <span>{`${currentRound} / ${totalRound}`}</span>
        </div>

        <div className="right-button">
          {playing ? (
            <Button onClick={pauseOnClick}>
              <Pause></Pause>
            </Button>
          ) : (
            <Button onClick={playOnClick}>
              <Play></Play>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
