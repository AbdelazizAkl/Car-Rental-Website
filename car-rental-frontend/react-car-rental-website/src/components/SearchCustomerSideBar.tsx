import React from "react";
import { useState } from "react";
import axios from "axios";
import ReservationsTable from "./ReservationTable";
import SearchCustomerTable from "./SearchCustomersTable";

const SearchCustomerSidebar: React.FC = () => {
  interface customer {
    id: string;
    fName: string;
    lName: string;
    email: string;
    address: number;
    phone: string;
    PassportNumber: number;
  }
  const [customerId, setcustomerId] = useState<string>("");
  const [customerFname, setcustomerFname] = useState<string>("");
  const [customerLname, setcustomerLname] = useState<string>("");
  const [customerEmail, setcustomerEmail] = useState<string>("");
  const [customerAddress, setcustomerAddress] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerPassportNumber, setCustomerPassportNumber] =
    useState<string>("");
  const [customersData, setcustomersData] = useState<customer[]>([]);
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
              "http://localhost:3000/customers/getById",
              { id: customerId },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setcustomersData(response.data.data);
                console.log(response.data.data);
              } else {
                setcustomersData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "customerFname":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/customers/getByFirstName",
              { fName: customerFname },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setcustomersData(response.data.data);
                console.log(response.data.data);
              } else {
                setcustomersData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;

      case "customerLname":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/customers/getByLastName",
              { lName: customerLname },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setcustomersData(response.data.data);
                console.log(response.data.data);
              } else {
                setcustomersData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "customerEmail":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/customers/getByEmail",
              { email: customerEmail },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setcustomersData(response.data.data);
                console.log(response.data.data);
              } else {
                setcustomersData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "customerAddress":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/customers/getByAddress",
              { address: customerAddress },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setcustomersData(response.data.data);
                console.log(response.data.data);
              } else {
                setcustomersData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "customerPhone":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/customers/getByPhone",
              { phone: customerPhone },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setcustomersData(response.data.data);
                console.log(response.data.data);
              } else {
                setcustomersData([]);
                console.log("Error fetching customers :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching customers status:", error);
        }
        break;
      case "customerPassportNumber":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/customers/getByPassportNumber",
              { PassportNumber: customerPassportNumber },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setcustomersData(response.data.data);
                console.log(response.data.data);
              } else {
                setcustomersData([]);
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
      case "customerFname":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter customer first name...`}
              value={customerFname}
              onChange={(e) => setcustomerFname(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "customerLname":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter customer last name...`}
              value={customerLname}
              onChange={(e) => setcustomerLname(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "customerEmail":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter customer email...`}
              value={customerEmail}
              onChange={(e) => setcustomerEmail(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "customerAddress":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter customer address...`}
              value={customerAddress}
              onChange={(e) => setcustomerAddress(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "customerPassportNumber":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter customer passport number...`}
              value={customerPassportNumber}
              onChange={(e) => setCustomerPassportNumber(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "customerPhone":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter customer phone...`}
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
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
        {customersData && (
          <SearchCustomerTable customers={customersData}></SearchCustomerTable>
        )}
      </div>

      <div className="customer-search-sidebar">
        <ul>
          <li onClick={() => handleSearchOption("customerId")}>
            Search by customer ID
          </li>
          <li onClick={() => handleSearchOption("customerFname")}>
            Search by customer first Name
          </li>
          <li onClick={() => handleSearchOption("customerLname")}>
            Search by customer last name
          </li>
          <li onClick={() => handleSearchOption("customerEmail")}>
            Search by customer email
          </li>
          <li onClick={() => handleSearchOption("customerAddress")}>
            Search by customer address
          </li>
          <li onClick={() => handleSearchOption("customerPhone")}>
            Search by customer phone number
          </li>
          <li onClick={() => handleSearchOption("customerPassportNumber")}>
            Search by passport number
          </li>
        </ul>
      </div>

      {renderSearchField()}
    </>
  );
};

export default SearchCustomerSidebar;
