import React from "react";
import "../css/CarsModal.css";
import { MDBBadge } from "mdb-react-ui-kit";

interface CarDetailsModalProps {
  car: {
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
  };
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="car-details-modal">
        <h1>
          {car.brand} - {car.model}
        </h1>
        <h3>plate ID: {car.plateId}</h3>
        <h3>
          Current status:{" "}
          {car.status === "active" && (
            <MDBBadge color="success" pill>
              {car.status}
            </MDBBadge>
          )}
          {car.status === "rented" && (
            <MDBBadge color="warning" pill>
              {car.status}
            </MDBBadge>
          )}
          {car.status === "out of service" && (
            <MDBBadge color="danger" pill>
              {car.status}
            </MDBBadge>
          )}
        </h3>
        <h3>
          Pricing: Daily {car.dailyPrice} LE - Weekly {car.weeklyPrice} LE
        </h3>
        <h3>
          Mileage{" "}
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#000000"
                d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
              ></path>
              <path
                fill="#000000"
                d="M192 512a320 320 0 1 1 640 0 32 32 0 1 1-64 0 256 256 0 1 0-512 0 32 32 0 0 1-64 0z"
              ></path>
              <path
                fill="#000000"
                d="M570.432 627.84A96 96 0 1 1 509.568 608l60.992-187.776A32 32 0 1 1 631.424 440l-60.992 187.776zM502.08 734.464a32 32 0 1 0 19.84-60.928 32 32 0 0 0-19.84 60.928z"
              ></path>
            </g>
          </svg>{" "}
          : {car.mileage}
        </h3>
        <h4>{car.features}</h4>
        <button onClick={onClose} className="btn btn-primary">
          Close
        </button>
      </div>
    </div>
  );
};

export default CarDetailsModal;
