import React from "react";
import "../css/CarsModal.css";
import { useState, useEffect } from "react";
import PaymentDetailsModal from "./PaymentDetailsModal";

interface ReserveCarModalProps {
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

const ReserveCarModal: React.FC<ReserveCarModalProps> = ({ car, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservationDuration, setReservationDuration] = useState(0);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    calculateReservationDuration(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    calculateReservationDuration(startDate, e.target.value);
  };

  const calculateReservationDuration = (start: string, end: string) => {
    const startTimestamp = new Date(start).getTime();
    const endTimestamp = new Date(end).getTime();

    if (!isNaN(startTimestamp) && !isNaN(endTimestamp)) {
      const durationInMilliseconds = Math.abs(endTimestamp - startTimestamp);
      const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
      const weeks = Math.floor(durationInDays / 7);
      const days = durationInDays % 7;
      const newTotalPrice = car.weeklyPrice * weeks + car.dailyPrice * days;
      setTotalPrice(newTotalPrice);

      // Update the reservation duration state
      setReservationDuration(durationInDays);
    } else {
      setReservationDuration(0);
      setTotalPrice(0);
    }
  };
  const handleReserve = () => {
    // Implement your logic to handle the reservation
    // This could involve sending a request to a server or updating local state
    console.log("Car reserved!", startDate, endDate);
    onClose(); // Close the modal after reservation
  };
  return (
    // <div className="modal-overlay">
    //   <div className="modal-container car-details-modal">
    //     <label>
    //       Start Date:
    //       <input
    //         type="date"
    //         value={startDate}
    //         onChange={handleStartDateChange}
    //       />
    //     </label>

    //     <label>
    //       End Date:
    //       <input type="date" value={endDate} onChange={handleEndDateChange} />
    //     </label>

    //     <p>Reservation Duration: {reservationDuration} days</p>

    //     {/* Display total price */}
    //     <p>Total Price: {totalPrice}LE</p>

    //     <div className="button-container">
    //       <button onClick={handleReserve} className="btn btn-primary">
    //         Reserve
    //       </button>
    //       <button onClick={onClose} className="btn btn-secondary">
    //         Cancel
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <PaymentDetailsModal></PaymentDetailsModal>
  );
};

export default ReserveCarModal;
