import React, { useState } from "react";
import "../css/navBar.css";
import ReservationsModal from "./ReservationsModal";
interface NavbarProps {
  home?: boolean;
  cars?: boolean;
} // Define props if needed in the future

const Navbar: React.FC<NavbarProps> = ({ home, cars }: NavbarProps) => {
  const [isReservationsModalOpen, setReservationsModalOpen] = useState(false);
  const userString = localStorage.getItem("UserData");

  let userInfo;

  if (userString !== null) {
    userInfo = JSON.parse(userString);
  } else {
    console.error("userInfoString is null. Unable to parse.");
  }

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    window.location.reload();
  };

  const handleReservations = () => {
    setReservationsModalOpen(true);
  };
  return (
    <div className="topnav">
      {home && (
        <a className="nav-link" href="#home-section">
          Home
        </a>
      )}
      {!home && (
        <a className="nav-link" href="/">
          Home
        </a>
      )}
      {home && (
        <a className="nav-link" href="/search">
          Search
        </a>
      )}
      {cars && (
        <a className="nav-link" href="#cars-section">
          Cars
        </a>
      )}
      {!cars && (
        <a className="nav-link" href="/car">
          Cars
        </a>
      )}
      {home && (
        <a className="nav-link" href="#about-section">
          Contact
        </a>
      )}
      {home && (
        <a className="nav-link" href="#about-section">
          About
        </a>
      )}
      {userInfo ? (
        <div className="topnav-right">
          <a className="nav-link user-welcome">Welcome {userInfo.fName}!</a>
          <a className="nav-link" href="#" onClick={handleLogout}>
            Logout
          </a>
          <a className="nav-link" href="#" onClick={handleReservations}>
            Reservations
          </a>
          <ReservationsModal
            isOpen={isReservationsModalOpen}
            onClose={() => setReservationsModalOpen(false)}
            userId={userInfo?.id}
          />
        </div>
      ) : (
        <div className="topnav-right">
          <a className="nav-link" href="/login">
            Login
          </a>
          <a className="nav-link" href="/register">
            Sign up
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
