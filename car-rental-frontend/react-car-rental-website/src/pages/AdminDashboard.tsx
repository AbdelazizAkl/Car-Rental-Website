import React from "react";
import CarStatusTable from "../components/CarsStatusTable";
import "../css/AdminPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  interface Car {
    id: string;
    model: string;
    year: string;
    plateId: string;
    status: string;
    office_id: number;
    images: string;
    dailyPrice: number;
    weeklyPrice: number;
    mileage: number;
    features: string;
  }
  const adminString = localStorage.getItem("AdminData");
  const [carStatus, setCarStatus] = useState(false);
  const [carStatusData, setCarStatusData] = useState<Car[]>([]);
  const [date, setDate] = useState("");
  const [reservation, setReservation] = useState(false);

  async function handleCarStatusDateClick() {
    if (date === "") {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        await axios
          .get("http://localhost:3000/cars/", config)
          .then((response) => {
            if (response.data.data) {
              setCarStatusData(response.data.data);
              setReservation(false);
            } else {
              console.log("Error fetching cars :", response.data.error);
            }
          });
      } catch (error) {
        console.log("date", date);
        console.log("Error fetching cars status:", error);
      }
    } else {
      try {
        setReservation(true);
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        await axios
          .post("http://localhost:3000/admins/getCarsStatus", {
            date,
          })
          .then((response) => {
            if (response.data.data) {
              setCarStatusData(response.data.data);
              console.log(response.data.data);
            } else {
              setCarStatusData([]);

              console.log("Error fetching cars :", response.data.error);
            }
          });
      } catch (error) {
        setCarStatusData([]);
        console.log("Error fetching cars status:", error);
      }
    }
  }

  const handleCarStatusClick = () => {
    setCarStatus(true);
    handleCarStatusDateClick();
  };
  const handleReservationsClick = () => {
    setCarStatus(false);
  };
  const handleSearchClick = () => {
    setCarStatus(false);
  };
  const handleRevenueClick = () => {
    setCarStatus(false);
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    console.log("date changed", date);
  };

  useEffect(() => {
    handleCarStatusDateClick();
  }, [date]);

  let adminInfo;

  if (adminString !== null) {
    adminInfo = JSON.parse(adminString);
  } else {
    console.error("AdminInfoString is null. Unable to parse.");
  }
  const handleLogout = () => {
    localStorage.removeItem("AdminData");
    window.location.reload();
  };
  return (
    <>
      {adminInfo ? (
        <>
          <div className="AdminContainer">
            {carStatus && (
              <div className="tableContainer">
                <input type="date" value={date} onChange={handleDate} />

                {carStatus && carStatusData && (
                  <div>
                    <CarStatusTable
                      reservation={reservation}
                      carStatusData={carStatusData}
                    ></CarStatusTable>
                  </div>
                )}
              </div>
            )}

            <ul className="sidebar">
              <li>
                <span>KWAIZO</span>
              </li>
              <li onClick={handleReservationsClick}>
                <span>
                  <i className="fa fa-home"></i>
                </span>
                <span>Reservations</span>
              </li>
              <li onClick={handleRevenueClick}>
                <span>
                  <i className="fa fa-dashboard"></i>
                </span>
                <span>Revenue</span>
              </li>
              <li onClick={handleCarStatusClick}>
                <span>
                  <i className="fa fa-users"></i>
                </span>

                <span>Cars Status</span>
              </li>
              <li onClick={handleSearchClick}>
                <span>
                  <i className="fa fa-shopping-cart"></i>
                </span>
                <span>Advanced Search</span>
              </li>
              <li>
                <span>
                  <i className="fa fa-shopping-cart" onClick={handleLogout}>
                    Logout
                  </i>
                </span>
              </li>
            </ul>
            <div className="content"></div>
          </div>
        </>
      ) : (
        <h1>Access Denied You are not logged in as admin</h1>
      )}
    </>
  );
};

export default Dashboard;
