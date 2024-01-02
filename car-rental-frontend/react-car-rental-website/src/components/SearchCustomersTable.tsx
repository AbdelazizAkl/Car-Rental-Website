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
  customers: any[]; // Adjust the type based on your actual response structure
}

const CarsSearchTable: React.FC<ReservationsTableProps> = ({ customers }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Customer Id</th>
          <th scope="col">Customer First Name</th>
          <th scope="col">Customer Last Name</th>
          <th scope="col">Customer Email</th>
          <th scope="col">Customer Address</th>
          <th scope="col">Customer Phone</th>
          <th scope="col">Customer Passport Number</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {customers.map((data, index) => (
          <tr key={index}>
            <td>
              <p className="fw-normal mb-1">{data.id}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.fName}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.lName}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.email}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.address}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.phone}</p>
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

export default CarsSearchTable;
