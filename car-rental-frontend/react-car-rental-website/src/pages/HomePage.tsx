const home = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#ftco-nav"
        aria-controls="ftco-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="oi oi-menu"></span> Menu
      </button>

      <div className="collapse navbar-collapse" id="ftco-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a href="index.html" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/searchPage" className="nav-link">
              Search
            </a>
          </li>

          <li className="nav-item">
            <a href="/pricingPage" className="nav-link">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="/carsPage" className="nav-link">
              Cars
            </a>
          </li>
          <li className="nav-item">
            <a href="/contactPage" className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="/aboutPage" className="nav-link">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default home;
