import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

interface RevenueTable {
  revenueData: any[];
}

const RevenueTable: React.FC<RevenueTable> = ({ revenueData }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Amount Recieved</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {revenueData.map((data, index) => (
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{data.date}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-bold mb-1">{data.revenue}</p>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default RevenueTable;
