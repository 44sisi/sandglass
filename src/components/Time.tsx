import React from "react";

function Time(props: { seconds: number }) {
  return (
    <div>
      {timeToStr(Math.floor(props.seconds / 60))}:
      {timeToStr(props.seconds % 60)}
    </div>
  );
}

function timeToStr(time: number): string {
  return time.toString().padStart(2, "0");
}

export default Time;
