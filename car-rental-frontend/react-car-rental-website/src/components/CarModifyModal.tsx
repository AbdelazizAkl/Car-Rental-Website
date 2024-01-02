import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import CarModifyTable from "./CarModifyTable";

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
}

interface CarModifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarModifyModal: React.FC<CarModifyModalProps> = ({ isOpen, onClose }) => {
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
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Car Modal">
      <h2>Cars</h2>
      {carsData ? (
        // Render reservation data here
        <div>
          <CarModifyTable cars={carsData}></CarModifyTable>
        </div>
      ) : (
        <p>Loading cars...</p>
      )}
      <button
        style={{ position: "absolute", bottom: 0, left: 0 }}
        className="btn btn-secondary"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default CarModifyModal;
