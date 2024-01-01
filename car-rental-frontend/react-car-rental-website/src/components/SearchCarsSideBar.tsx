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
    // Implement your search functionality based on the selected option and its respective state
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
                console.log("Error fetching cars :", response.data.error);
              }
            });
        } catch (error) {
          console.log("Error fetching cars status:", error);
        }
        break;
      case "carColor":
        // Implement search by carColor
        console.log("Searching by Car Color:", carColor);
        // Add your specific search logic for Car Color here
        break;
      case "carModel":
        // Implement search by carModel
        console.log("Searching by Car Model:", carModel);
        // Add your specific search logic for Car Model here
        break;
      case "carYear":
        // Implement search by carYear
        console.log("Searching by Car Year:", carYear);
        // Add your specific search logic for Car Year here
        break;
      case "carBrand":
        // Implement search by carBrand
        console.log("Searching by Car Brand:", carBrand);
        // Add your specific search logic for Car Brand here
        break;
      case "plateId":
        // Implement search by plateId
        console.log("Searching by Plate ID:", plateId);
        // Add your specific search logic for Plate ID here
        break;
      case "dailyPrice":
        // Implement search by dailyPrice
        console.log("Searching by Daily Price:", dailyPrice);
        // Add your specific search logic for Daily Price here
        break;
      case "weeklyPrice":
        // Implement search by weeklyPrice
        console.log("Searching by Weekly Price:", weeklyPrice);
        // Add your specific search logic for Weekly Price here
        break;
      case "officeId":
        // Implement search by officeId
        console.log("Searching by Office ID:", officeId);
        // Add your specific search logic for Office ID here
        break;
      case "carStatus":
        // Implement search by carStatus
        console.log("Searching by Car Status:", carStatus);
        // Add your specific search logic for Car Status here
        break;
      // Add cases for other search options as needed
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
      {carsData && <CarsSearchTable cars={carsData}></CarsSearchTable>}
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
