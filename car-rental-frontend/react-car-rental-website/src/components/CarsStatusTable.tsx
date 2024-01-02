import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

interface CarStatusTableProps {
  carStatusData: any[];
  reservation?: boolean;
}

const CarStatusTable: React.FC<CarStatusTableProps> = ({
  carStatusData,
  reservation,
}) => {
  return (
    <div
      className="table-responsive"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Brand</th>
            <th scope="col">Car Status</th>
            {reservation && <th scope="col">Reservation Status</th>}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {carStatusData.map((data, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{data.car_id || data.id}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{data.brand}</p>
                <p className="text-muted mb-0">{data.model}</p>
              </td>
              <td>
                {(data.cars_status === "active" ||
                  data.status === "active") && (
                  <MDBBadge color="success" pill>
                    {data.cars_status || data.status}
                  </MDBBadge>
                )}
                {(data.cars_status === "outOfService" ||
                  data.status === "outOfService") && (
                  <MDBBadge color="danger" pill>
                    {data.cars_status || data.status}
                  </MDBBadge>
                )}
              </td>
              {reservation && (
                <td>
                  {(data.reservations_status === "No Reservation" ||
                    data.reservations_status === "canceled") && (
                    <MDBBadge color="success" pill>
                      Available
                    </MDBBadge>
                  )}
                  {(data.reservations_status === "reserved" ||
                    data.reservations_status === "confirmed") && (
                    <MDBBadge color="warning" pill>
                      Reserved
                    </MDBBadge>
                  )}
                </td>
              )}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default CarStatusTable;
