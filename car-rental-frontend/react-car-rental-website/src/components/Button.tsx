import React, { ReactNode } from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  color: string;
  onClick?: () => void; // Add onClick
}

const Button = ({ children, color, onClick }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
