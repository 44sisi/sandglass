import React, { useState } from "react";
import Button from "./components/Button";
import Time from "./components/Time";
import { ReactComponent as Reset } from "./icons/reset.svg";
import { ReactComponent as Play } from "./icons/play.svg";
import { ReactComponent as Pause } from "./icons/pause.svg";

let Timer: any;

const synth = window.speechSynthesis;
const voices = synth.getVoices();
console.log(voices);
// console.log(voices[0].name);

function speak(text: string) {
  let utterThis = new SpeechSynthesisUtterance(text);
  // utterThis.voice = voices[0];
  synth.speak(utterThis);
}

function App() {
  const totalRound = 2,
    totalExercise = 2,
    exerciseTime = 3,
    restTime = 4;

  const roundExerciseTime = exerciseTime * totalExercise;
  const roundTime = roundExerciseTime + restTime;
  const totalTime = roundTime * totalRound;

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
  let currentRound = Math.floor(elapsedTime / roundTime) + 1;
  let roundElapsedTime = elapsedTime % roundTime;
  let rest = roundElapsedTime >= roundExerciseTime;
  let currentExercise = rest
    ? totalExercise
    : Math.floor(roundElapsedTime / exerciseTime) + 1;
  let countdown = rest
    ? roundTime - roundElapsedTime
    : exerciseTime * currentExercise - roundElapsedTime;

  function resetTimer() {
    setPlaying(false);
    clearInterval(Timer);
    resetState();
  }

  function playOnClick() {
    setPlaying(true);
    Timer = setInterval(function () {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);
  }

  function pauseOnClick() {
    setPlaying(false);
    clearInterval(Timer);
  }

  if (elapsedTime >= totalTime) {
    resetTimer();
  }

  if (
    playing &&
    (rest
      ? [roundExerciseTime, roundTime].includes(roundElapsedTime)
      : !(roundElapsedTime % exerciseTime))
  ) {
    console.log({
      elapsedTime,
      currentRound,
      roundElapsedTime,
      currentExercise,
    });
    rest
      ? speak("rest")
      : elapsedTime === totalTime
      ? speak("your timer has completed")
      : speak(`exercise ${currentExercise}`);
  }

  document.querySelector("html")!.style.background = rest
    ? "#25b174"
    : "#222222";

  return (
    <div className="app">
      <div className="countdown text-center">
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
