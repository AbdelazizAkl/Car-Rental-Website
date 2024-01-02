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

const ReservationsSearchTable: React.FC<ReservationsTableProps> = ({
  reservations,
}) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Reservation Id</th>
          <th scope="col">Customer Id</th>
          <th scope="col">Car Id</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Amount Paid</th>
          <th scope="col">Total Price</th>
          <th scope="col">Reservation Status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {reservations.map((data, index) => (
          <tr key={index}>
            <td>
              <p className="fw-normal mb-1">{data.id}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.customerId}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.carId}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.startDate.slice(0, 10)}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.endDate.slice(0, 10)}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">
                {data.ReservationDate.slice(0, 10)}
              </p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.amountPaid}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.totalPrice}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.status}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.PassportNumber}</p>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default ReservationsSearchTable;
