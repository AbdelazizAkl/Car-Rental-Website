import "../css/Car.css";
import Navbar from "../components/NavBar";
import carImage from "../images/cars/car-1.jpg";
import CarCard from "../components/CarsCard";

const cars = () => {
  return (
    <div>
      <div className="carsParent">
        <Navbar home={false} />
      </div>
      {/* <section className="hero-wrap hero-wrap-2 js-fullheight"  data-stellar-background-ratio="0.5">
      <img src={carImage} className="img-fluid" />
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
          <div className="col-md-9 ftco-animate pb-5">
          	<p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"></i></a></span> <span>Cars <i className="ion-ios-arrow-forward"></i></span></p>
            <h1 className="mb-3 bread">Choose Your Car</h1>
          </div>
        </div>
      </div>
    </section> */}

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            <CarCard
              myImage={carImage}
              name="Mercedes Grand Sedan"
              brand="Cheverolet"
              price="500"
              linkToDetails="/home"
            />
            <CarCard
              myImage={carImage}
              name="Mercedes Grand Sedan"
              brand="Cheverolet"
              price="500"
              linkToDetails="/home"
            />
            <CarCard
              myImage={carImage}
              name="Mercedes Grand Sedan"
              brand="Cheverolet"
              price="500"
              linkToDetails="/home"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default cars;
