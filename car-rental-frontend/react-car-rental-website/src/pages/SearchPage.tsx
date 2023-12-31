import { useState } from "react";
import axios from "axios";
import "../css/Search.css";
import Navbar from "../components/NavBar";
import CarCard from "../components/CarsCard";
import CarDetailsModal from "../components/CarsDetailsModal";
import "../css/Car.css";
import ReserveCarModal from "../components/ReserveCarModal";

const Search = () => {
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
    onClickDetails: () => void;
    onClickReserve: () => void;
  }

  const [filters, setFilters] = useState({
    year: "",
    model: "",
    dailyPrice: "",
    weeklyPrice: "",
  });

  const [cars, setCarsData] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/cars/search",
        filters
      );

      if (response.data.success) {
        setCarsData(response.data.data);
        console.log(response.data.data);
      } else {
        setCarsData([]);
        console.error("Failed to retrieve cars:", response.data.message);
      }
    } catch (error) {
      console.log("Error during search:", error);
      // Handle network or unexpected errors
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <>
      <div className="searchParent">
        <div>
          <Navbar home={false} />
        </div>
        <section className="col-lg-12">
          <div className="searchContainer">
            <form action="#" method="post">
              <div>
                <div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control search-slt"
                        id="yearSelection"
                        onChange={(e) =>
                          handleFilterChange("year", e.target.value)
                        }
                      >
                        <option value="">Select Year</option>
                        <option value="2012">2012</option>
                        <option value="2020">2020</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control search-slt"
                        id="modelSelection"
                        onChange={(e) =>
                          handleFilterChange("model", e.target.value)
                        }
                      >
                        <option value="">Select Model</option>
                        <option value="Peugeot 2008">Peugeot</option>
                        <option value="Rebecca">Rebecca</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control search-slt"
                        id="dailyPriceSelection"
                        onChange={(e) =>
                          handleFilterChange("dailyPrice", e.target.value)
                        }
                      >
                        <option value="">Select Daily Price</option>
                        <option value="1000">1000 LE</option>
                        <option value="1200">1200 LE</option>
                        <option value="1300">1300 LE</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control search-slt"
                        id="weeklyPriceSelection"
                        onChange={(e) =>
                          handleFilterChange("weeklyPrice", e.target.value)
                        }
                      >
                        <option value="">Select Weekly Price</option>
                        <option value="6000">6000 LE</option>
                        <option value="6500">6500 LE</option>
                        <option value="8000">8000 LE</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <button
                        onClick={handleSearch}
                        type="button"
                        className="btn btn-danger wrn-btn"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>

      <section>
        <div className="cardContainer  px-4">
          <div className="row d-flex justify-content-center">
            {cars.map((car) => (
              <div className="col-md-4" key={car.id}>
                <CarCard
                  key={car.id}
                  myImage={car.images}
                  name={car.model}
                  brand={car.year}
                  price={car.dailyPrice}
                  onClickDetails={() => {
                    setSelectedCar(car);
                    setIsDetailsModalOpen(true);
                  }}
                  onClickReserve={() => {
                    setSelectedCar(car);
                    setIsReserveModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedCar && isDetailsModalOpen && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
      {selectedCar && isReserveModalOpen && (
        <ReserveCarModal
          car={selectedCar}
          onClose={() => setIsReserveModalOpen(false)}
        />
      )}
    </>
  );
};

export default Search;
