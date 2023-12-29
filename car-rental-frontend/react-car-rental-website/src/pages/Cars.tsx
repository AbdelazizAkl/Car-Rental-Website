import "../css/Car.css";
import Navbar from "../components/NavBar";
import CarCard from "../components/CarsCard";
import axios from "axios";
import { useState, useEffect } from "react";
import myCar from "../images/cars/car-1.jpg";

const cars = () => {
  interface Car {
    id: string;
    images: string; // Adjust type if images are an array or object
    model: string;
    year: string;
    dailyPrice: string;
    linkToDetails: string;
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
    <div>
      <div className="carsParent">
        <Navbar home={false} />
      </div>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            {carsData.map((car) => (
              <CarCard
                key={`http://localhost:3000/images/${car.images}`} // Assuming each car has a unique ID
                myImage={car.images}
                name={car.model}
                brand={car.year}
                price={car.dailyPrice}
                linkToDetails={""} // Assuming linkToDetails exists in car data
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default cars;
