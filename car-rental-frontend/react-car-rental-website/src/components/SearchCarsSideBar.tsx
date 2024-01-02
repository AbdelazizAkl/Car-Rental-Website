import React from "react";
import { useState } from "react";
import axios from "axios";
import ReservationsTable from "./ReservationTable";
import CarsSearchTable from "./CarsSearchTable";

const SearchCarsSidebar: React.FC = () => {
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
  const [carId, setCarId] = useState<string>("");
  const [carColor, setCarColor] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");
  const [carBrand, setCarBrand] = useState<string>("");
  const [plateId, setPlateId] = useState<string>("");
  const [dailyPrice, setDailyPrice] = useState<string>("");
  const [weeklyPrice, setWeeklyPrice] = useState<string>("");
  const [officeId, setOfficeId] = useState<string>("");
  const [carStatus, setCarStatus] = useState<string>("");
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [searchOption, setSearchOption] = useState<string>("");

  const handleSearchOption = (option: string) => {
    setSearchOption(option);
  };

  async function handleSearch() {
    switch (searchOption) {
      case "carId":
        console.log(carId);
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post("http://localhost:3000/cars/getById", { id: carId }, config)
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "carColor":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByColor",
              { color: carColor },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;

      case "carModel":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByModel",
              { model: carModel },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "carYear":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByYear",
              { year: carYear },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "carBrand":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByBrand",
              { brand: carBrand },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "plateId":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByPlateId",
              { plateId: plateId },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "dailyPrice":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByDailyPrice",
              { dailyPrice: dailyPrice },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "weeklyPrice":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByWeeklyPrice",
              { weeklyPrice: weeklyPrice },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "officeId":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByOfficeId",
              { office_id: officeId },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "carStatus":
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
          await axios
            .post(
              "http://localhost:3000/cars/getByStatus",
              { status: carStatus },
              config
            )
            .then((response) => {
              if (response.data.data) {
                setCarsData(response.data.data);
                console.log(response.data.data);
              } else {
                setCarsData([]);
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
      case "carId":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Car ID...`}
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "carColor":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Car Color...`}
              value={carColor}
              onChange={(e) => setCarColor(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "carModel":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Car Model...`}
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "carYear":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Car Year...`}
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "carBrand":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Car Brand...`}
              value={carBrand}
              onChange={(e) => setCarBrand(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "plateId":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Plate ID...`}
              value={plateId}
              onChange={(e) => setPlateId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "dailyPrice":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Daily Price...`}
              value={dailyPrice}
              onChange={(e) => setDailyPrice(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "weeklyPrice":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Weekly Price...`}
              value={weeklyPrice}
              onChange={(e) => setWeeklyPrice(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "officeId":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Office ID...`}
              value={officeId}
              onChange={(e) => setOfficeId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        );
      case "carStatus":
        return (
          <div className="search-input-field">
            <input
              type="text"
              placeholder={`Enter Car Status...`}
              value={carStatus}
              onChange={(e) => setCarStatus(e.target.value)}
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
        {carsData && <CarsSearchTable cars={carsData}></CarsSearchTable>}
      </div>
      <div className="car-search-sidebar">
        <ul>
          <li onClick={() => handleSearchOption("carId")}>Search by Car ID</li>
          <li onClick={() => handleSearchOption("carColor")}>
            Search by Car Color
          </li>
          <li onClick={() => handleSearchOption("carModel")}>
            Search by Car Model
          </li>
          <li onClick={() => handleSearchOption("carYear")}>
            Search by Car Year
          </li>
          <li onClick={() => handleSearchOption("carBrand")}>
            Search by Car Brand
          </li>
          <li onClick={() => handleSearchOption("plateId")}>
            Search by Plate ID
          </li>
          <li onClick={() => handleSearchOption("dailyPrice")}>
            Search by Daily Price
          </li>
          <li onClick={() => handleSearchOption("weeklyPrice")}>
            Search by Weekly Price
          </li>
          <li onClick={() => handleSearchOption("officeId")}>
            Search by Office ID
          </li>
          <li onClick={() => handleSearchOption("carStatus")}>
            Search by Car Status
          </li>
        </ul>
      </div>

      {renderSearchField()}
    </>
  );
};

export default SearchCarsSidebar;
