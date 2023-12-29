interface Props {
  myImage: string;
  name: string;
  brand: string;
  linkToDetails: string;
  price: string;
}

const CarCard = ({ myImage, name, brand, price, linkToDetails }: Props) => {
  return (
    <div className="col-md-4">
      <div className="car-wrap rounded ftco-animate">
        <div className="img rounded d-flex align-items-end">
          <img src={myImage} className="img-fluid" />
        </div>
        <div className="text">
          <h2 className="mb-0">
            <a href={linkToDetails}>{name}</a>
          </h2>
          <div className="d-flex mb-3">
            <span className="cat">{brand}</span>
            <p className="price ml-auto">
              ${price} <span>/day</span>
            </p>
          </div>
          <p className="d-flex mb-0 d-block">
            <a href="#" className="btn btn-primary py-2 mr-1">
              Book now
            </a>{" "}
            <a href={linkToDetails} className="btn btn-secondary py-2 ml-1">
              Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
