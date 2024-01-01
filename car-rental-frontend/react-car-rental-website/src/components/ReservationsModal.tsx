import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import ReservationsTable from "./ReservationTable";

interface Reservation {
  id: string;
}

interface ReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null | undefined; // Update the type as per your needs
}

const ReservationsModal: React.FC<ReservationsModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [reservationData, setReservationData] = useState<Reservation[] | null>(
    null
  );

  useEffect(() => {
    // Fetch reservation data based on userId and update state
    const fetchData = async () => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        const response = await axios.post(
          "http://localhost:3000/reservations/getByCustomerId",
          { id: userId }, // Send the customer ID in the request body
          config
        );

        if (response.data.success) {
          setReservationData(response.data.data); // Store fetched reservations in state
        } else {
          console.error("Error fetching :", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    if (isOpen && userId) {
      fetchData();
    }
  }, [isOpen, userId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Reservations Modal"
    >
      <h2>Reservations</h2>
      {reservationData ? (
        // Render reservation data here
        <div>
          <ReservationsTable reservations={reservationData}></ReservationsTable>
        </div>
      ) : (
        <p>Loading reservations...</p>
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

export default ReservationsModal;
