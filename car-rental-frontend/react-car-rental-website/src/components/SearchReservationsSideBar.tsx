import React from "react";
import { useState } from "react";
import axios from "axios";
import SearchReservationsTable from "./SearchReservationsTable";
const SearchCustomerSidebar: React.FC = () => {
  interface reservation {
    id: string;
    customerId: string;
    carId: string;
    startDate: Date;
    endDate: Date;
    ReservationDate: Date;
    amountPaid: string;
    totalPrice: string;
    status: string;
  }
  const [customerId, setcustomerId] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [reservationStartDate, setReservationStartDate] = useState<string>("");
  const [reservationEndDate, setReservationEndDate] = useState<string>("");
  const [reservationDate, setReservationDate] = useState<string>("");
  const [amountPaid, setAmountPaid] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [reservationStatus, setReservationStatus] = useState<string>("");
  const [reservationData, setReservationData] = useState<reservation[]>([]);
  const [searchOption, setSearchOption] = useState<string>("");
  const handleSearchOption = (option: string) => {
    setSearchOption(option);
  };

  async function handleSearch() {
    switch (searchOption) {
      case "id":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getById",
              { id: id },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "customerId":
        console.log(customerId);
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getByCustomerId",
              { customerId: customerId },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "carId":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getByCarId",
              { carId: carId },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;

      case "reservationStartDate":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getByStartDate",
              { startDate: reservationStartDate },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "reservationEndDate":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getByEndDate",
              { endDate: reservationEndDate },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "amountPaid":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getByAmountPaid",
              { amountPaid: amountPaid },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "totalPrice":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getByTotalPrice",
              { totalPrice: totalPrice },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "reservationStatus":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/reservations/getByStatus",
              { status: reservationStatus },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setReservationData(response.data.data);
                console.log(response.data.data);
              } else {
                setReservationData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
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
              placeholder={`Enter customer ID...`}
              value={customerId}
              onChange={(e) => setcustomerId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "id":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Reservation ID...`}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "carId":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter car id...`}
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "reservationStartDate":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter start date...`}
              value={reservationStartDate}
              onChange={(e) => setReservationStartDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "reservationEndDate":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter end date...`}
              value={reservationEndDate}
              onChange={(e) => setReservationEndDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "reservationDate":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter reservation date...`}
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "amountPaid":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter amount paid...`}
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "totalPrice":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter total price...`}
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "reservationStatus":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter reservationStatus...`}
              value={reservationStatus}
              onChange={(e) => setReservationStatus(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );

      // Add cases for other search options as needed
      default:
        return null;
    }
  };

  return (
    <>
      <div className="carsTableContainer">
        {reservationData && (
          <SearchReservationsTable
            reservations={reservationData}
          ></SearchReservationsTable>
        )}
      </div>

      <div className="customer-search-sidebar">
        <ul>
          <li onClick={() => handleSearchOption("id")}>
            Search by Reservation ID
          </li>
          <li onClick={() => handleSearchOption("customerId")}>
            Search by Customer ID
          </li>
          <li onClick={() => handleSearchOption("carId")}>Search by Car ID</li>
          <li onClick={() => handleSearchOption("reservationStartDate")}>
            Search by Start Date
          </li>
          <li onClick={() => handleSearchOption("reservationEndDate")}>
            Search by End Date
          </li>
          <li onClick={() => handleSearchOption("reservationDate")}>
            Search by Reservation Date
          </li>
          <li onClick={() => handleSearchOption("amountPaid")}>
            Search by Amount Paid
          </li>
          <li onClick={() => handleSearchOption("totalPrice")}>
            Search by Total Price
          </li>
          <li onClick={() => handleSearchOption("reservationStatus")}>
            Search by reservationStatus
          </li>
        </ul>
      </div>

      {renderSearchField()}
    </>
  );
};

export default SearchCustomerSidebar;
