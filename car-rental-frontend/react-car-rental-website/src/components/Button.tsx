import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  color: string;
  to?: string; // Make to optional
  onClick?: () => void; // Add onClick
}

const Button = ({ children, color, to, onClick }: Props) => {
  return (
    // Conditionally render Link or button based on to prop
    to ? (
      <Link to={to} className={"btn btn-" + color}>
        {children}
      </Link>
    ) : (
      <button className={"btn btn-" + color} onClick={onClick}>
        {children}
      </button>
    )
  );
};

export default Button;
