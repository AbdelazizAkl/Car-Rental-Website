import React, { useState } from "react";

interface Props {
  myImage: string;
  name: string;
  brand: string;
  price: number;
  onClickDetails: () => void;
  onClickReserve: () => void;
}

const CarCard = ({
  myImage,
  name,
  brand,
  price,
  onClickDetails,
  onClickReserve,
}: Props) => {
  const userString = localStorage.getItem("UserData");

  let userInfo;

  if (userString !== null) {
    userInfo = JSON.parse(userString);
  } else {
    console.log("userInfoString is null. Unable to parse.");
  }
  return (
    <div>
      <div>
        <div
          className="img rounded"
          style={{ width: "300px", height: "200px" }}
        >
          <img src={myImage} className="img-fluid" />
        </div>

        <div className="text">
          <h2 className="mb-0">
            <a>{name}</a>
          </h2>
          <div className="d-flex mb-3">
            <span className="cat">Model: {brand}</span>
            <div className="offset-1"></div>
            <p>
              Price: {price} <span>LE</span> <span>/day</span>
            </p>
          </div>
          <p className="d-flex mb-0 d-block">
            {userInfo ? (
              <a
                onClick={() => {
                  onClickReserve();
                }}
                className="btn btn-primary py-2 mr-1"
              >
                Book now
              </a>
            ) : null}
            <div className="offset-0.5"></div>
            <a
              onClick={() => {
                onClickDetails();
              }}
              className="btn btn-secondary py-2 ml-1"
            >
              Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
