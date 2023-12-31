import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit"; // Assuming you are using MDBReact for styling

interface TableProps {
  data: {
    name: string;
    title: string;
    status: string;
    position: string;
  }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Title</th>
          <th scope="col">Status</th>
          <th scope="col">Position</th>
          <th scope="col">Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={`https://mdbootstrap.com/img/new/avatars/${
                    index + 1
                  }.jpg`}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">{item.name}</p>
                  <p className="text-muted mb-0">{"youssef"}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">{item.title}</p>
              <p className="text-muted mb-0">{"karim"}</p>
            </td>
            <td>
              <MDBBadge
                color={
                  item.status === "Active"
                    ? "success"
                    : item.status === "Onboarding"
                    ? "primary"
                    : "warning"
                }
                pill
              >
                {item.status}
              </MDBBadge>
            </td>
            <td>{item.position}</td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Edit
              </MDBBtn>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default Table;
