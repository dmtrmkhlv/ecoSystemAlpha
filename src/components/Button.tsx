import React from "react";
import "./../styles/Button.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  color?: "main" | "sub" | "delete" | "save";
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = "main",
  type,
}) => {
  return (
    <button onClick={onClick} type={type} className={`button ${color}`}>
      {text}
    </button>
  );
};

export default Button;
