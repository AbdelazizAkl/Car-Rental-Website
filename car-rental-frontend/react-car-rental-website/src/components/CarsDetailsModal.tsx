import React from "react";
import "../css/CarsModal.css";

interface CarDetailsModalProps {
  car: {
    id: string;
    model: string;
    year: string;
    plateId: string;
    status: string;
    office_id: number;
    images: string;
    dailyPrice: string;
    weeklyPrice: string;
    mileage: number;
    features: string;
  };
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container car-details-modal">
        {/* Add your modal content here */}
        <h2>
          {car.model} - {car.year}
        </h2>
        <h1>
          {car.plateId} - {car.status}
        </h1>
        <h1>
          Pricing: Daily {car.dailyPrice} - Weekly {car.weeklyPrice}
        </h1>
        <h1>Mileage: {car.mileage}</h1>
        <h1>{car.features}</h1>
        {/* Display other car details */}
        <button onClick={onClose} className="modal-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default CarDetailsModal;
