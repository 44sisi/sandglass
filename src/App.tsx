import React, { useState } from "react";
import Button from "./components/Button";
import Time from "./components/Time";
import { ReactComponent as Play } from "./icons/play.svg";
import { ReactComponent as Pause } from "./icons/pause.svg";
import { ReactComponent as Reset } from "./icons/reset.svg";

let Timer: any;

function App() {
  const totalRound = 5,
    totalExercise = 5,
    exerciseTime = 30,
    restTime = 60;

  const roundExerciseTime = exerciseTime * totalExercise;
  const roundTIme = roundExerciseTime + restTime;
  const totalTime = roundTIme * totalRound;

  const initialState = {
    playing: false,
    elapsedTime: 0,
  };

  const [playing, setPlaying] = useState(initialState.playing);
  const [elapsedTime, setElapsedTime] = useState(initialState.elapsedTime);

  function resetState() {
    setPlaying(initialState.playing);
    setElapsedTime(initialState.elapsedTime);
  }

  let remainingTime = totalTime - elapsedTime;
  let currentRound = Math.floor(elapsedTime / roundTIme) + 1;
  let roundElapsedTime = elapsedTime % roundTIme;
  let rest = roundElapsedTime >= roundExerciseTime;
  let currentExercise = rest
    ? totalExercise
    : Math.floor(roundElapsedTime / exerciseTime) + 1;
  let countdown = rest
    ? roundTIme - roundElapsedTime
    : exerciseTime * currentExercise - roundElapsedTime;

  document.querySelector("html")!.style.background = rest
    ? "#25b174"
    : "#222222";

  function resetTimer() {
    setPlaying(false);
    clearInterval(Timer);
    resetState();
  }

  function playOnClick() {
    setPlaying(true);
    let timeElapsed = elapsedTime;
    Timer = setInterval(function () {
      timeElapsed++;
      setElapsedTime(timeElapsed);
      if (timeElapsed >= totalTime) {
        resetTimer();
      }
    }, 1000);
  }

  function pauseOnClick() {
    setPlaying(false);
    clearInterval(Timer);
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
            <Time seconds={elapsedTime}></Time>
          </div>
        </div>

        <div className="text-center">
          <div className="label">EXERCISES</div>
          <div className="content">{`${currentExercise} / ${totalExercise}`}</div>
        </div>

        <div className="text-center">
          <div className="label">REMAINING</div>
          <div className="content">
            <Time seconds={remainingTime}></Time>
          </div>
        </div>
      </div>

      <div className="flex-row control-row">
        <div className="left-button">
          <Button onClick={resetTimer}>
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
