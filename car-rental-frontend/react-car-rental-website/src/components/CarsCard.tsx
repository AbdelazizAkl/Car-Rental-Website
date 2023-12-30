interface Props {
  myImage: string;
  name: string;
  brand: string;
  linkToDetails: string;
  price: string;
  onClick: () => void;
}

const CarCard = ({
  myImage,
  name,
  brand,
  price,
  linkToDetails,
  onClick,
}: Props) => {
  return (
    <div>
      <div>
        <div
          className="img rounded"
          style={{ width: "300px", height: "200px" }}
        >
          <img src={myImage} className="img-fluid" />
        </div>

        <div className="text">
          <h2 className="mb-0">
            <a>{name}</a>
          </h2>
          <div className="d-flex mb-3">
            <span className="cat">Model: {brand}</span>
            <div className="offset-1"></div>
            <p>
              Price: {price} <span>LE</span> <span>/day</span>
            </p>
          </div>
          <p className="d-flex mb-0 d-block">
            <a href="#" className="btn btn-primary py-2 mr-1">
              Book now
            </a>
            <div className="offset-0.5"></div>
            <a
              onClick={() => {
                onClick();
              }}
              className="btn btn-secondary py-2 ml-1"
            >
              Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
