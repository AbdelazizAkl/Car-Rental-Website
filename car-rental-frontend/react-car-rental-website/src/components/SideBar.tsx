import { useState } from "react";
import SearchCarsSidebar from "./SearchCarsSideBar";
const AdvancedSearchSidebar: React.FC = () => {
  const [showSearchCarsSidebar, setShowSearchCarsSidebar] = useState(false);

  const handleSearchCarsClick = () => {
    setShowSearchCarsSidebar(!showSearchCarsSidebar);
  };
  return (
    <div className="advanced-search-sidebar">
      {showSearchCarsSidebar && <SearchCarsSidebar />}
      <ul>
        <li onClick={handleSearchCarsClick}>
          <span>
            <i className="fa fa-home"></i>
          </span>
          <span>Search Cars</span>
        </li>
        <li>
          <span>
            <i className="fa fa-dashboard"></i>
          </span>
          <span>Search Customers</span>
        </li>
        <li>
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
