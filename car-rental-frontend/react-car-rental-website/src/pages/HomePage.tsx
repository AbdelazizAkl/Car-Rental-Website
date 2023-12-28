import "../css/Home.css";
import Navbar from "../components/NavBar";
import myImage from "../images/homeBackground.jpg";


const home = () => {
  return (
    <>
    <div className="homePageParent">
      <Navbar />
    </div>
    <div>
    <section className="ftco-section ftco-about">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center">
                      <img src={myImage} className="img-fluid"></img>
                    </div>
                    <div className="col-md-6 wrap-about ftco-animate">
              <div className="heading-section heading-section-white pl-md-5">
                  <span className="subheading">About us</span>
                <h2 className="mb-4">Welcome to Kwaizo's car rental</h2>

                <p>KwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizo</p>
                <p>KwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizoKwaizo</p>
                <p><a href="#" className="btn btn-primary py-3 px-4">Search Vehicle</a></p>
              </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
  );
};
export default home;
