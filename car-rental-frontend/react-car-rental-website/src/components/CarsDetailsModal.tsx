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
    dailyPrice: number;
    weeklyPrice: number;
    mileage: number;
    features: string;
  };
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container car-details-modal">
        <h1>
          {car.model} - {car.year}
        </h1>
        <h3>
          {car.plateId} - {car.status}
        </h3>
        <h3>
          Pricing: Daily {car.dailyPrice} - Weekly {car.weeklyPrice}
        </h3>
        <h3>Mileage: {car.mileage}</h3>
        <h4>{car.features}</h4>
        <button onClick={onClose} className="btn btn-primary">
          Close
        </button>
      </div>
    </div>
  );
};

export default CarDetailsModal;
