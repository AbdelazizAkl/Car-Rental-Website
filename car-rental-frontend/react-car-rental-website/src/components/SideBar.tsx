import { useState } from "react";
import SearchCarsSidebar from "./SearchCarsSideBar";
import SearchCustomerSidebar from "./SearchCustomerSideBar";
import SearchReservationsSidebar from "./SearchReservationsSideBar";
const AdvancedSearchSidebar: React.FC = () => {
  const [showSearchCarsSidebar, setShowSearchCarsSidebar] = useState(false);
  const [showSearchCustomersSidebar, setShowSearchCustomersSidebar] =
    useState(false);
  const [showSearchReservationsSidebar, setShowSearchReservationsSidebar] =
    useState(false);

  const handleSearchCarsClick = () => {
    setShowSearchCarsSidebar(!showSearchCarsSidebar);
    setShowSearchCustomersSidebar(false);
    setShowSearchReservationsSidebar(false);
  };
  const handleSearchCustomerClick = () => {
    setShowSearchCustomersSidebar(!showSearchCustomersSidebar);
    setShowSearchReservationsSidebar(false);
    setShowSearchCarsSidebar(false);
  };
  const handleSearchReservationsClick = () => {
    setShowSearchReservationsSidebar(!showSearchReservationsSidebar);
    setShowSearchCustomersSidebar(false);
    setShowSearchCarsSidebar(false);
  };
  return (
    <div className="advanced-search-sidebar">
      {showSearchCarsSidebar && <SearchCarsSidebar />}
      {showSearchCustomersSidebar && <SearchCustomerSidebar />}
      {showSearchReservationsSidebar && <SearchReservationsSidebar />}

      <ul>
        <li onClick={handleSearchCarsClick}>
          <span>
            <i className="fa fa-home"></i>
          </span>
          <span>Search Cars</span>
        </li>
        <li onClick={handleSearchCustomerClick}>
          <span>
            <i className="fa fa-home"></i>
          </span>
          <span>Search Customers</span>
        </li>
        <li onClick={handleSearchReservationsClick}>
          <span>
            <i className="fa fa-user"></i>
          </span>
          <span>Search Reservations</span>
        </li>
      </ul>
    </div>
  );
};

export default AdvancedSearchSidebar;
