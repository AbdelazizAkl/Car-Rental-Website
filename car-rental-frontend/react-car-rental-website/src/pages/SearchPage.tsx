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
    brand: string;
    year: string;
    plateId: string;
    color: string;
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
    brand: "",
    model: "",
    color: "",
    dailyPrice: "",
    weeklyPrice: "",
    office_id: "",
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
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control search-slt"
                        id="modelSelection"
                        onChange={(e) =>
                          handleFilterChange("brand", e.target.value)
                        }
                      >
                        <option value="">Select Brand</option>
                        <option value="Peugeot">Peugeot</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Renault">Renault</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="BMW">BMW</option>
                        <option value="Jeep">Jeep</option>
                        <option value="Aston Martin">Aston Martin</option>
                        <option value="Porsche">Porsche</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Audi">Audi</option>
                        <option value="McLaren">McLaren</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Nissan">Nissan</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control search-slt"
                        id="colorSelection"
                        onChange={(e) =>
                          handleFilterChange("color", e.target.value)
                        }
                      >
                        <option value="">Select Color</option>
                        <option value="Blue">Blue</option>
                        <option value="Silver">Silver</option>
                        <option value="Bronze">Bronze</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Gold">Gold</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Grey">Grey</option>
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
                        <option value="700">700 LE</option>
                        <option value="1000">1000 LE</option>
                        <option value="1500">1500 LE</option>
                        <option value="2000">2000 LE</option>
                        <option value="2500">2500 LE</option>
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
                        <option value="4100">4100 LE</option>
                        <option value="6000">6000 LE</option>
                        <option value="9500">9500 LE</option>
                        <option value="13000">13000 LE</option>
                        <option value="16000">16000 LE</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        className="form-control search-slt"
                        id="officeSelection"
                        onChange={(e) =>
                          handleFilterChange("office_id", e.target.value)
                        }
                      >
                        <option value="">Select Office</option>
                        <option value="1">Cairo, Alexandria</option>
                        <option value="2">France, Paris</option>
                        <option value="3">Korea, Seoul</option>
                        <option value="4">Japan, Tokyo</option>
                        <option value="5">America, California</option>
                        <option value="6">Australia, Sydney</option>
                        <option value="7">England, London</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                      <a href="#searched-cars">
                        <button
                          onClick={handleSearch}
                          type="button"
                          className="btn btn-danger wrn-btn"
                        >
                          Search
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>

      <section>
        <div className="cardContainer  px-4" id="searched-cars">
          <div className="row d-flex">
            {cars.map((car, index) => (
              <div
                key={car.id}
                className={`col-md-4 ${
                  index % 6 === 0 || index % 6 === 3
                    ? "offset-md-0"
                    : "offset-md-4"
                }`}
              >
                <CarCard
                  myImage={car.images}
                  model={car.model}
                  brand={car.brand}
                  color={car.color}
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
