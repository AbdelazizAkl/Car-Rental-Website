import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";

interface AdminReservationsTableCustomerProps {
  specificCustomer: any[]; // Adjust the type based on your actual response structure
}

const AdminReservationsTableCustomer: React.FC<
  AdminReservationsTableCustomerProps
> = ({ specificCustomer }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Customer Id</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Passport Number</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Address</th>
          <th scope="col">Email Address</th>
          <th scope="col">Car Brand</th>
          <th scope="col">Car Model</th>
          <th scope="col">Car Plate ID</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Reservation Status</th>
          <th scope="col">Amount Paid</th>
          <th scope="col">Total Price</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {specificCustomer.map((data, index) => (
          <tr key={index}>
            <td>
              <p className="fw-normal mb-1">{data.customerId}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.fName}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.lName}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.PassportNumber}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.phone}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.address}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.email}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.brand}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.model}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.plateId}</p>
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
              <p className="fw-normal mb-1">{data.status}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.amountPaid}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.totalPrice}</p>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default AdminReservationsTableCustomer;
