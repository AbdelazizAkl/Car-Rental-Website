import React from "react";
import CarStatusTable from "../components/CarsStatusTable";
import RevenueTable from "../components/RevenueTable";
import "../css/AdminPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AdvancedSearchSidebar from "../components/SideBar";
import AdminReservationsSideBar from "../components/AdminReservationsSideBar";
import Button from "../components/Button";
interface DashboardProps {}
// zizo
const Dashboard: React.FC<DashboardProps> = () => {
  interface Car {
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
  }
  interface Revenue {
    date: string;
    revenue: string;
  }
  const adminString = localStorage.getItem("AdminData");
  // const[alertVisible,setAlertVisibility] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [plateId, setPlateId] = useState("");
  const [status, setStatus] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [image, setImage] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [weeklyPrice, setWeeklyPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [features, setFeatures] = useState("");
  const [carStatus, setCarStatus] = useState(false);
  const [carStatusData, setCarStatusData] = useState<Car[]>([]);
  const [carStatusDate, setCarStatusDate] = useState("");
  const [reservation, setReservation] = useState(false);
  const [revenueState, setRevenueState] = useState(false);
  const [revenueStartDate, setRevenueStartDate] = useState("");
  const [revenueEndDate, setRevenueEndDate] = useState("");
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [reservationOptionState, setReservationOptionState] = useState(false);

  async function registrationHandler() {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      await axios
        .post(
          "http://localhost:3000/cars/",
          {
            brand,
            model,
            year,
            color,
            plateId,
            status,
            office_id: officeId,
            images: image,
            dailyPrice,
            weeklyPrice,
            mileage,
            features,
          },
          config
        )
        .then((response) => {
          if (response.data.data) {
            setCreateForm(false);
          } else {
            console.log(
              "Error fetching revenue (response) :",
              response.data.error
            );
          }
        });
    } catch (error) {
      console.log("Error fetching revenue (catch) :", error);
    }
  }

  function getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      dates.push(formattedDate);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  async function handleRevenueDateClick() {
    try {
      const RStartDate = new Date(revenueStartDate as string);
      const REndDate = new Date(revenueEndDate as string);
      const days = getDatesBetween(RStartDate, REndDate);
      let i;
      const allRevenueData: Revenue[] = [];

      for (i = 0; i < days.length; i++) {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        await axios
          .post(
            "http://localhost:3000/admins/revenues",
            { day: days[i] },
            config
          )
          .then((response) => {
            if (response.data.data) {
              allRevenueData.push(response.data.data);
            } else {
              console.log(
                "Error fetching revenue (response) :",
                response.data.error
              );
            }
          });
      }
      setRevenueData(allRevenueData);
    } catch (error) {
      console.log("Entered Period", revenueStartDate, revenueEndDate);
      console.log("Error fetching revenue (catch) :", error);
    }
  }
  async function handleCarStatusDateClick() {
    if (carStatusDate === "") {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        await axios
          .get("http://localhost:3000/cars/", config)
          .then((response) => {
            if (response.data.data) {
              setCarStatusData(response.data.data);
              setReservation(false);
            } else {
              console.log("Error fetching cars :", response.data.error);
            }
          });
      } catch (error) {
        console.log("date", carStatusDate);
        console.log("Error fetching cars status:", error);
      }
    } else {
      try {
        setReservation(true);
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        await axios
          .post("http://localhost:3000/admins/getCarsStatus", {
            date: carStatusDate,
          })
          .then((response) => {
            if (response.data.data) {
              setCarStatusData(response.data.data);
              console.log(response.data.data);
            } else {
              setCarStatusData([]);

              console.log("Error fetching cars :", response.data.error);
            }
          });
      } catch (error) {
        setCarStatusData([]);
        console.log("Error fetching cars status:", error);
      }
    }
  }
  async function handleAddClick() {
    setCreateForm(true);
    setShowAdvancedSearch(false);
    setRevenueState(false);
    setCarStatus(false);
    setReservationOptionState(false);
  }
  const handleCarStatusClick = () => {
    setCarStatus(true);
    setRevenueState(false);
    handleCarStatusDateClick();
    setShowAdvancedSearch(false);
    setReservationOptionState(false);
  };
  const handleReservationsClick = () => {
    setCarStatus(false);
    setRevenueState(false);
    setShowAdvancedSearch(false);
    setReservationOptionState(true);
  };
  const handleSearchClick = () => {
    setCarStatus(false);
    setRevenueState(false);
    setShowAdvancedSearch(!showAdvancedSearch);
    setReservationOptionState(false);
  };

  const handleRevenueClick = () => {
    setCarStatus(false);
    setRevenueState(true);
    setReservationOptionState(false);
    setShowAdvancedSearch(false);
    setReservationOptionState(false);
  };

  const handleCarStatusDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCarStatusDate(e.target.value);
    console.log("date changed", carStatusDate);
  };

  const handleRevenueStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRevenueStartDate(e.target.value);
    console.log("date changed", revenueStartDate);
  };
  const handleRevenueEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRevenueEndDate(e.target.value);
    console.log("date changed", revenueEndDate);
  };

  useEffect(() => {
    handleCarStatusDateClick();
  }, [carStatusDate]);

  useEffect(() => {
    handleRevenueDateClick();
  }, [revenueStartDate, revenueEndDate]);

  let adminInfo;

  if (adminString !== null) {
    adminInfo = JSON.parse(adminString);
  } else {
    console.error("AdminInfoString is null. Unable to parse.");
  }
  const handleLogout = () => {
    localStorage.removeItem("AdminData");
    window.location.reload();
  };
  return (
    <>
      {adminInfo ? (
        <>
          <div className="AdminContainer">
            {reservationOptionState && <AdminReservationsSideBar />}
            {showAdvancedSearch && <AdvancedSearchSidebar />}
            {createForm && (
              <div className="homePage">
                <div className="RegisterContainer">
                  <div className="RegisterCard">
                    <div className="form">
                      <div className="left-side">
                        <img src="https://mphclub.com/wp-content/uploads/2021/07/mercedes-benz-lineup-exotic-car-rental-mph-club.jpg" />
                      </div>
                      <div className="right-side">
                        <div className="register">
                          <p>
                            Already a member? <a href="/login">Login Now</a>
                          </p>
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            registrationHandler();
                          }}
                        >
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Brand"
                              name="brand"
                              value={brand}
                              onChange={(event) => setBrand(event.target.value)}
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Model"
                              name="model"
                              value={model}
                              onChange={(event) => setModel(event.target.value)}
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Production Year"
                              name="year"
                              value={year}
                              onChange={(event) => setYear(event.target.value)}
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Color"
                              name="color"
                              value={color}
                              onChange={(event) => setColor(event.target.value)}
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Plate ID"
                              name="plateId"
                              value={plateId}
                              onChange={(event) =>
                                setPlateId(event.target.value)
                              }
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter status"
                              name="status"
                              value={status}
                              onChange={(event) =>
                                setStatus(event.target.value)
                              }
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Office ID"
                              name="password"
                              value={officeId}
                              onChange={(event) =>
                                setOfficeId(event.target.value)
                              }
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Image URL"
                              name="imageURL"
                              value={image}
                              onChange={(event) => setImage(event.target.value)}
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Daily Price"
                              name="dailyPrice"
                              value={dailyPrice}
                              onChange={(event) =>
                                setDailyPrice(event.target.value)
                              }
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Weekly Price"
                              name="weeklyPrice"
                              value={weeklyPrice}
                              onChange={(event) =>
                                setWeeklyPrice(event.target.value)
                              }
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Mileage"
                              name="mileage"
                              value={mileage}
                              onChange={(event) =>
                                setMileage(event.target.value)
                              }
                            />
                          </div>
                          <div className="input_text">
                            <input
                              type="text"
                              placeholder="Enter Features"
                              name="features"
                              value={features}
                              onChange={(event) =>
                                setFeatures(event.target.value)
                              }
                            />
                          </div>
                          <div className="button">
                            <Button color="primary">Register</Button>
                            {/* {alertVisible && (
                        <Alert onClose={() => setAlertVisibility(false)}>
                          {alertMessage}
                        </Alert>
                      )} */}
                          </div>
                        </form>

                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {carStatus && (
              <div className="tableContainer">
                <input
                  type="date"
                  value={carStatusDate}
                  onChange={handleCarStatusDateChange}
                />

                {carStatus && carStatusData && (
                  <div>
                    <CarStatusTable
                      reservation={reservation}
                      carStatusData={carStatusData}
                    ></CarStatusTable>
                  </div>
                )}
              </div>
            )}
            {revenueState && (
              <div className="tableContainer">
                Start Date:
                <input
                  type="date"
                  value={revenueStartDate}
                  onChange={handleRevenueStartDateChange}
                />
                End Date:
                <input
                  type="date"
                  value={revenueEndDate}
                  onChange={handleRevenueEndDateChange}
                />
                <RevenueTable revenueData={revenueData}></RevenueTable>
              </div>
            )}

            <ul className="sidebar">
              <li>
                <span>KWAIZO</span>
              </li>
              <li onClick={handleReservationsClick}>
                <span>
                  <i className="fa fa-home"></i>
                </span>
                <span>Reservations</span>
              </li>
              <li onClick={handleRevenueClick}>
                <span>
                  <i className="fa fa-dashboard"></i>
                </span>
                <span>Revenue</span>
              </li>
              <li onClick={handleCarStatusClick}>
                <span>
                  <i className="fa fa-users"></i>
                </span>

                <span>Cars Status</span>
              </li>
              <li onClick={handleSearchClick}>
                <span>
                  <i className="fa fa-shopping-cart"></i>
                </span>
                <span>Advanced Search</span>
              </li>
              <li onClick={handleAddClick}>
                <span>
                  <i className="fa fa-shopping-cart"></i>
                </span>
                <span>Add car</span>
              </li>
              <li>
                <span>
                  <i className="fa fa-shopping-cart" onClick={handleLogout}>
                    Logout
                  </i>
                </span>
              </li>
            </ul>
            <div className="content"></div>
          </div>
        </>
      ) : (
        <h1>Access Denied You are not logged in as admin</h1>
      )}
    </>
  );
};

export default Dashboard;
