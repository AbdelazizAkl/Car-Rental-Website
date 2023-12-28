import "../css/navBar.css";
const home = () => {
  return (
    <div className="homePageParent">
      <nav className="top-nav navbar navbar-expand-lg navbar-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a className="nav-link active" href="/home">
              Home
            </a>
            <a className="nav-link" href="/searchPage">
              Search
            </a>
            <a className="nav-link" href="/pricingPage">
              Pricing
            </a>
            <a className="nav-link" href="/carsPage">
              Cars
            </a>
            <a className="nav-link" href="/contactPage">
              Contact
            </a>
            <a className="nav-link" href="/aboutPage">
              About
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default home;
