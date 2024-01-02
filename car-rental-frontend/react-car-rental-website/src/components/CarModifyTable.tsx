import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";

interface CarModifyTableProps {
  cars: any[]; // Adjust the type based on your actual response structure
}

const CarModifyTable: React.FC<CarModifyTableProps> = ({ cars }) => {
  const [carState, setCarState] = useState(cars);

  const handleSetOutService = async (index: number) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      await axios
        .post(
          "http://localhost:3000/cars/OutOfService",
          {
            id: cars[index].id,
          },
          config
        )
        .then((response) => {
          if (response.data.success) {
            cars[index].status = "outOfService";
            setCarState(response.data.data);
          }
        });
    } catch (error) {
      console.log("Error cancelling reservation:", error);
    }
  };
  const handleSetActive = async (index: number) => {
    try {
      // Assuming reservationsState is a state variable
      // Update the status of the reservation to "canceled"

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      await axios
        .post(
          "http://localhost:3000/cars/active",
          {
            id: cars[index].id,
          },
          config
        )
        .then((response) => {
          if (response.data.success) {
            cars[index].status = "active";
            setCarState(response.data.data);
          }
        });
    } catch (error) {
      console.log("Error cancelling reservation:", error);
    }
  };
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Car Id</th>
          <th scope="col">Car Brand</th>
          <th scope="col">Car Model</th>
          <th scope="col">Car Status</th>
          <th scope="col">Set Out of Service</th>
          <th scope="col">Set Active</th>
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
              {data.status === "active" && (
                <MDBBadge color="success" pill>
                  {data.status}
                </MDBBadge>
              )}
              {data.status === "outOfService" && (
                <MDBBadge color="danger" pill>
                  {data.status}
                </MDBBadge>
              )}
            </td>
            <td>
              {data.status === "active" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleSetOutService(index)}
                >
                  Set Out Of Service
                </button>
              )}
            </td>
            <td>
              {data.status === "outOfService" && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleSetActive(index)}
                >
                  Set Active
                </button>
              )}
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default CarModifyTable;
