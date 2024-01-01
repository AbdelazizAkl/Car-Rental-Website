import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";

interface ReservationsTableProps {
  reservations: any[]; // Adjust the type based on your actual response structure
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
}) => {
  const [reservationsState, setReservations] = useState(reservations);
  const handleCancelReservation = async (index: number) => {
    try {
      // Assuming reservationsState is a state variable
      const updatedReservations = [...reservationsState];

      // Update the status of the reservation to "canceled"

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      await axios
        .post(
          "http://localhost:3000/reservations/cancel",
          {
            customerId: updatedReservations[index].customerId,
            carId: updatedReservations[index].carId,
            id: updatedReservations[index].id, // Pass any necessary data for your API request
          },
          config
        )
        .then((response) => {
          if (response.data.success) {
            updatedReservations[index].status = "canceled";
            setReservations(updatedReservations);
          }
        });

      // Update the state to reflect the changes
    } catch (error) {
      console.log("Error cancelling reservation:", error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Start Date</th>
          <th scope="col">End date</th>
          <th scope="col">Car Brand</th>
          <th scope="col">Car Model</th>
          <th scope="col">Amount Paid</th>
          <th scope="col">Total Price</th>
          <th scope="col">Status</th>
          <th scope="col">Cancel</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {reservations.map((data, index) => (
          <tr key={index}>
            <td>
              <p className="fw-normal mb-1">{data.startDate.slice(0, 10)}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.endDate.slice(0, 10)}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.brand}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.model}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.amountPaid}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.totalPrice}</p>
            </td>
            <td>
              {data.status === "completed" && (
                <MDBBadge color="success" pill>
                  {data.status}
                </MDBBadge>
              )}
              {data.status === "reserved" && (
                <MDBBadge color="warning" pill>
                  {data.status}
                </MDBBadge>
              )}
              {data.status === "canceled" && (
                <MDBBadge color="danger" pill>
                  {data.status}
                </MDBBadge>
              )}
            </td>
            <td>
              {data.status !== "canceled" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancelReservation(index)}
                >
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default ReservationsTable;
