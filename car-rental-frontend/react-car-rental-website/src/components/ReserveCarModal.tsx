import React from "react";
import "../css/CarsModal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";

interface ReserveCarModalProps {
  car: {
    id: string;
    model: string;
    year: string;
    plateId: string;
    status: string;
    office_id: number;
    images: string;
    dailyPrice: number;
    weeklyPrice: number;
    mileage: number;
    features: string;
  };
  onClose: () => void;
}

const ReserveCarModal: React.FC<ReserveCarModalProps> = ({
  car,
  onClose,
}: ReserveCarModalProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  // const [amountPaid, setAmountPaid] = useState(0);
  const [reservationDuration, setReservationDuration] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisibility] = useState(false);
  const [cvc, setCVC] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardOwner, setCardOwner] = useState("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    calculateReservationDuration(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;

    if (selectedEndDate < startDate) {
      setAlertVisibility(true);
      setAlertMessage("End date cannot be earlier than the start date");
    } else {
      setEndDate(selectedEndDate);
      calculateReservationDuration(startDate, selectedEndDate);
    }
  };

  const calculateReservationDuration = (start: string, end: string) => {
    const startTimestamp = new Date(start + "T00:00:00").getTime();
    const endTimestamp = new Date(end + "T00:00:00").getTime();

    if (!isNaN(startTimestamp) && !isNaN(endTimestamp)) {
      const durationInMilliseconds = Math.abs(endTimestamp - startTimestamp);
      const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
      const weeks = Math.floor(durationInDays / 7);
      const days = durationInDays % 7;
      const newTotalPrice = car.weeklyPrice * weeks + car.dailyPrice * days;
      setTotalPrice(newTotalPrice);
      // setAmountPaid(newTotalPrice/2);

      // Update the reservation duration state
      setReservationDuration(durationInDays);
    } else {
      setReservationDuration(0);
      setTotalPrice(0);
    }
  };
  async function handleReserve() {
    // Implement your logic to handle the reservation
    // This could involve sending a request to a server or updating local state
    try {
      if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        setAlertVisibility(true);
        setAlertMessage("Card number must be a 16-digit number");
        return;
      }

      if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
        setAlertVisibility(true);
        setAlertMessage("CVC must be a 3-digit number");
        return;
      }
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const loginResponse = await axios
        .post(
          "http://localhost:3000/reservations/reserve",
          {
            customerId: 1,
            carId: car.id,
            startDate,
            endDate,
            amountPaid: totalPrice / 2,
            totalPrice,
            status: "reserved",
            cvc,
            cardNumber,
            cardOwner,
          },
          config
        )
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.message);
            onClose();
          } else {
            setAlertVisibility(true);
            console.log(response.data.message);
            setAlertMessage(response.data.message);
          }
        });
    } catch (error) {
      console.log("Reserve error:", error);
    }
  }
  return (
    <div className="reservationModal">
      <div className="d-flex">
        <div className="offset-1">
          <div className="paymentContainer">
            <div className="row">
              <div>
                <div className="reservationContent">
                  <label>
                    Start Date:
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </label>

                  <label>
                    End Date:
                    <input
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                  </label>

                  <p>Reservation Duration: {reservationDuration} days</p>

                  <p>Total Price: {totalPrice}LE</p>
                </div>
              </div>
              <div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <div className="row">
                      <h3 className="text-center">Payment Details</h3>
                      <img
                        className="img-responsive cc-img"
                        src="https://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png"
                      />
                    </div>
                  </div>
                  <div className="panel-body">
                    <form role="form">
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="form-group">
                            <label>CARD NUMBER</label>
                            <div className="input-group">
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="Valid Card Number"
                                onChange={(event) =>
                                  setCardNumber(event.target.value)
                                }
                              />
                              <span className="input-group-addon">
                                <span className="fa fa-credit-card"></span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-5 ">
                          <div className="form-group">
                            <label>CV CODE</label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="CVC"
                              onChange={(event) => setCVC(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-5 ">
                          <div className="form-group">
                            <label>CARD OWNER</label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Card Owner Name"
                              onChange={(event) =>
                                setCardOwner(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="panel-footer">
                    <div className="row">
                      <div className="col-xs-12 d-flex justify-content-between">
                        <button
                          onClick={handleReserve}
                          className="btn btn-warning btn-lg"
                        >
                          Process payment
                        </button>

                        <button
                          onClick={onClose}
                          className="btn btn-secondary btn-lg"
                        >
                          Cancel
                        </button>

                        {alertVisible && (
                          <Alert onClose={() => setAlertVisibility(false)}>
                            {alertMessage}
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveCarModal;
