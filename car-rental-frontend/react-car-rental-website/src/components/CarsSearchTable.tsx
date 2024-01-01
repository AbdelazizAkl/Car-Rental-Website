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
  cars: any[]; // Adjust the type based on your actual response structure
}

const CarsSearchTable: React.FC<ReservationsTableProps> = ({ cars }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Car Id</th>
          <th scope="col">Brand</th>
          <th scope="col">Model</th>
          <th scope="col">Year</th>
          <th scope="col">Color</th>
          <th scope="col">Plate Id</th>
          <th scope="col">Status</th>
          <th scope="col">Office Id</th>
          <th scope="col">Daily Price</th>
          <th scope="col">Weekly Price</th>
          <th scope="col">Mileage</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {cars.map((data, index) => (
          <tr key={index}>
            <td>
              <p className="fw-normal mb-1">{data.id}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.brand}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.model}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.year}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.color}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.plateId}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.status}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.office_id}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.dailyPrice}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.weeklyPrice}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.mileage}</p>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default CarsSearchTable;
