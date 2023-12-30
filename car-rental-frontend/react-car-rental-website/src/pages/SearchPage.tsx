import { useState } from "react";
import axios from "axios";
import "../css/Search.css";
import Navbar from "../components/NavBar";

const Search = () => {
  interface car {
    id: string;
    images: string; // Adjust type if images are an array or object
    model: string;
    year: string;
    dailyPrice: string;
    linkToDetails: string;
  }
  const [selectedId, setSelectedId] = useState("");
  const [cars, setCarsData] = useState<car[]>([]);

  const handleIdChange = async (id: string) => {
    setSelectedId(id);

    if (id) {
      // Make a request to the backend to fetch cars based on the selected ID
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };

        const response = await axios.get(
          `http://localhost:3000/cars/${id}`,
          config
        );

        if (response.data.success) {
          setCarsData(response.data.data); // Store fetched cars in state
          console.log("Cars fetched successfully!");
          console.log(response.data.data[0].model);
        } else {
          console.error("Error fetching cars:", response.data.message);
          // Handle the error appropriately, e.g., display an error message
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        // Handle the error appropriately, e.g., display an error message
      }
    } else {
      setCarsData([]); // Clear cars when no ID is selected
    }
  };

  return (
    <div className="searchParent">
      <div>
        <Navbar home={false} />
      </div>
      <section className="col-lg-12">
        <div className="searchContainer">
          <form action="#" method="post">
            <div>
              <div>
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control search-slt"
                      id="exampleFormControlSelect1"
                      onChange={(e) => handleIdChange(e.target.value)}
                    >
                      <option value="">Select ID</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      {/* Add other ID options here */}
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control search-slt"
                      id="exampleFormControlSelect2"
                    >
                      <option>Select Car</option>
                      {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <button type="button" className="btn btn-danger wrn-btn">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Search;
