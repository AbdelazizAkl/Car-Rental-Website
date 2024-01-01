import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

interface ReservationsTableProps {
  reservations: any[]; // Adjust the type based on your actual response structure
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
}) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Start Date</th>
          <th scope="col">End date</th>
          <th scope="col">Amount Paid</th>
          <th scope="col">Total Price</th>
          {<th scope="col">Status</th>}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {reservations.map((data, index) => (
          <tr key={index}>
            <td>
              <p className="fw-normal mb-1">{data.startDate}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.endDate}</p>
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
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default ReservationsTable;
