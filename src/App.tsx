import React, { useState } from "react";
import Button from "./components/Button";
import Time from "./components/Time";
import { ReactComponent as Reset } from "./icons/reset.svg";
import { ReactComponent as Play } from "./icons/play.svg";
import { ReactComponent as Pause } from "./icons/pause.svg";
import NoSleep from "nosleep.js";

let Timer: NodeJS.Timeout;

const synth = window.speechSynthesis;
const utterThis = new SpeechSynthesisUtterance();

function speak(text: string) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  utterThis.text = text;
  synth.speak(utterThis);
}

const noSleep = new NoSleep();

function App() {
  const initialState = {
    playing: false,
    elapsedTime: 0,
    totalRound: 5,
  };

  const [playing, setPlaying] = useState(initialState.playing);
  const [elapsedTime, setElapsedTime] = useState(initialState.elapsedTime);
  const [totalRound, setTotalRound] = useState(initialState.totalRound);

  const totalExercise = 5,
    exerciseTime = 30,
    restTime = 60;

  const roundExerciseTime = exerciseTime * totalExercise;
  const roundTime = roundExerciseTime + restTime;
  const totalTime = roundTime * totalRound;

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
    noSleep.disable();
    clearInterval(Timer);
    resetState();
  }

  function playOnClick() {
    noSleep.enable();
    setPlaying(true);
    Timer = setInterval(function () {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);
  }

  function pauseOnClick() {
    noSleep.disable();
    setPlaying(false);
    clearInterval(Timer);
  }

  if (elapsedTime >= totalTime - restTime) {
    resetTimer();
  }

  if (
    playing &&
    (rest
      ? [roundExerciseTime, roundTime].includes(roundElapsedTime)
      : !(roundElapsedTime % exerciseTime))
  ) {
    elapsedTime === totalTime - restTime
      ? speak("your timer is complete")
      : rest
      ? speak("rest")
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
          <div className="label">EXERCISE</div>
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
          <span>RND {`${currentRound} / `}</span>
          <input
            type="number"
            min="1"
            max="100"
            value={totalRound}
            onChange={(e) => setTotalRound(e.target.valueAsNumber)}
            className="total-round"
          />
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
