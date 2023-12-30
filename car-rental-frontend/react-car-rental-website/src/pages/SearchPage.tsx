import "../css/Search.css";
import Navbar from "../components/NavBar";
const search = () => {
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
                    >
                      <option>Select Vehicle</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control search-slt"
                      id="exampleFormControlSelect1"
                    >
                      <option>Select Vehicle</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control search-slt"
                      id="exampleFormControlSelect1"
                    >
                      <option>Select Vehicle</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
                      <option>Example one</option>
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

export default search;
