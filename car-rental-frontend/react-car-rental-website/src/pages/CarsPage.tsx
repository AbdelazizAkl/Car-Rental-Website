import "../css/Car.css";
import Navbar from "../components/NavBar";
import CarCard from "../components/CarsCard";
import axios from "axios";
import { useState, useEffect } from "react";
import CarDetailsModal from "../components/CarsDetailsModal";
import ReserveCarModal from "../components/ReserveCarModal";

const cars = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  interface Car {
    id: string;
    model: string;
    brand: string;
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

  const [carsData, setCarsData] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        const response = await axios.get("http://localhost:3000/cars/", config);

        if (response.data) {
          setCarsData(response.data.data); // Store fetched cars in state
          console.log("Cars fetched successfully!");
        } else {
          console.error("Error fetching cars:", response.data.error);
          // Handle the error appropriately, e.g., display an error message
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        // Handle the error appropriately, e.g., display an error message
      }
    };

    fetchCars();
  }, []);

  console.log(carsData);

  // Fetch cars on component mount

  return (
    <>
      <div className="carsParent">
        <Navbar cars={true} />
        <section
          className="hero-wrap hero-wrap-2 js-fullheight"
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay"></div>
          <div className="carsContainer">
            <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
              <div className="col-md-9 ftco-animate pb-5">
                <p className="breadcrumbs">
                  <span className="mr-2"></span>{" "}
                </p>
                <h1 className="mb-3 bread">Choose Your Car</h1>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="ftco-section bg-light" id="cars-section">
        <div className="cardContainer  px-4">
          <div className="row d-flex justify-content-center">
            {carsData.map((car) => (
              <div className="col-md-4">
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

export default cars;
