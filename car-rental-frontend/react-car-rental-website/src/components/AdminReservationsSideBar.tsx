import React from "react";
import { useState } from "react";
import axios from "axios";
import ReservationsTable from "./ReservationTable";
import CarsSearchTable from "./CarsSearchTable";
import AdminReservationsTableCustomer from "./AdminReservationsTableCustomer";
import AdminReservationsTableDate from "./AdminReservationsTableDate";
import AdminReservationsTableCar from "./AdminReservationsTableCar";

const AdminReservationsSideBar: React.FC = () => {
  interface specificCustomer {
    customerId: string;
    startDate: string;
    endDate: string;
    carId: string;
    ReservationDate: string;
    amountPaid: string;
    totalPrice: string;
    reservationStatus: string;
    fName: string;
    lName: string;
    email: string;
    phone: string;
    address: string;
    PassportNumber: string;
    brand: string;
    model: string;
    plateId: string;
  }
  interface specificDate {
    customerId: string;
    startDate: Date;
    endDate: Date;
    carId: string;
    ReservationDate: string;
    amountPaid: string;
    totalPrice: string;
    status: string;
    fName: string;
    lName: string;
    email: string;
    phone: string;
    address: string;
    PassportNumber: string;
    brand: string;
    model: string;
    plateId: string;
    color: string;
    year: string;
    office_id: string;
    dailyPrice: string;
    weeklyPrice: string;
  }
  interface specificCar {
    customerId: string;
    startDate: Date;
    endDate: Date;
    carId: string;
    ReservationDate: string;
    amountPaid: string;
    totalPrice: string;
    status: string;
    brand: string;
    model: string;
    plateId: string;
    color: string;
    year: string;
    office_id: string;
    dailyPrice: string;
    weeklyPrice: string;
  }
  const [customerId, setCustomerId] = useState<string>("");
  const [carStartDate, setCarStartDate] = useState<string>("");
  const [carEndDate, setCarEndDate] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [rStartDate, setRStartDate] = useState<string>("");
  const [rEndDate, setREndDate] = useState<string>("");
  const [specificCustomer, setSpecificCustomer] = useState<specificCustomer[]>(
    []
  );
  const [specificDate, setSpecificDate] = useState<specificDate[]>([]);
  const [specificCar, setSpecificCar] = useState<specificCar[]>([]);
  const [searchOption, setSearchOption] = useState<string>("");

  const handleSearchOption = (option: string) => {
    setSearchOption(option);
  };

  async function handleSearch() {
    switch (searchOption) {
      case "customerId":
        console.log(customerId);
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/admins/getReservationsByCustomer",
              { id: customerId },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setSpecificCustomer(response.data.data);
              } else {
                console.log(
                  "Error fetching cars (response):",
                  response.data.error
                );
              }
            });
        } catch (error) {
          console.log("Error fetching cars status (catch):", error);
        }
        break;
      case "ReservationWithPeriod":
        // Implement search by carColor
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/admins/ReservationsByDate",
              { startDate: rStartDate, endDate: rEndDate },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setSpecificDate(response.data.data);
              } else {
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "ReservationWithPeriodAndCar":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getAllByCarId",
              { startDate: carStartDate, endDate: carEndDate },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setSpecificCar(response.data.data);
              } else {
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      default:
        break;
    }
  }

  const renderSearchField = () => {
    switch (searchOption) {
      case "customerId":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Customer ID...`}
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "ReservationWithPeriod":
        return (
          <div className="search-input-field">
            <input
              type="Date"
              placeholder={`Enter Start...`}
              value={rStartDate}
              onChange={(e) => setRStartDate(e.target.value)}
            />
            <input
              type="Date"
              placeholder={`Enter End...`}
              value={rEndDate}
              onChange={(e) => setREndDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "ReservationWithPeriodAndCar":
        return (
          <div className="search-input-field">
            <input
              type="Date"
              placeholder={`Enter Start...`}
              value={carStartDate}
              onChange={(e) => setCarStartDate(e.target.value)}
            />
            <input
              type="Date"
              placeholder={`Enter End...`}
              value={carEndDate}
              onChange={(e) => setCarEndDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {searchOption === "customerId" && (
        <div className="reservationSeachContainer">
          <AdminReservationsTableCustomer
            specificCustomer={specificCustomer}
          ></AdminReservationsTableCustomer>
        </div>
      )}
      {searchOption === "ReservationWithPeriod" && (
        <div className="reservationSeachContainer">
          <AdminReservationsTableDate
            specificDate={specificDate}
          ></AdminReservationsTableDate>
        </div>
      )}
      {searchOption === "ReservationWithPeriodAndCar" && (
        <div className="reservationSeachContainer">
          <AdminReservationsTableCar
            specificCar={specificCar}
          ></AdminReservationsTableCar>
        </div>
      )}

      <div className="reservation-search-sidebar">
        <ul>
          <li onClick={() => handleSearchOption("customerId")}>
            Get Reservations By Customer ID
          </li>
          <li onClick={() => handleSearchOption("ReservationWithPeriod")}>
            Get Reservations By Specific Period
          </li>
          <li onClick={() => handleSearchOption("ReservationWithPeriodAndCar")}>
            Get Reservations By Car in a Specific Period
          </li>
        </ul>
      </div>

      {renderSearchField()}
    </>
  );
};

export default AdminReservationsSideBar;
