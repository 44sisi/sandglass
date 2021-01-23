import React from "react";

function Button(props: ButtonProps) {
  console.log(props.children);

  return <button onClick={props.onClick}>{props.children}</button>;
}

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: any;
}

export default Button;
