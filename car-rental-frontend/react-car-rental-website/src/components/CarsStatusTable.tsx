import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

interface CarStatusTableProps {
  carStatusData: any[]; // Adjust the type based on your actual response structure
}

const CarStatusTable: React.FC<CarStatusTableProps> = ({ carStatusData }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Brand</th>
          <th scope="col">Status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {carStatusData.map((data, index) => (
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{data.id}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">{data.brand}</p>
              <p className="text-muted mb-0">{data.model}</p>
            </td>
            <td>
              {data.status === "active" && (
                <MDBBadge color="success" pill>
                  {data.status}
                </MDBBadge>
              )}
              {data.status === "rented" && (
                <MDBBadge color="warning" pill>
                  {data.status}
                </MDBBadge>
              )}
              {data.status === "out of service" && (
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

export default CarStatusTable;
