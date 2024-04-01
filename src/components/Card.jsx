import { Link } from "react-router-dom";

const Card = ({ offer }) => {
  const {
    _id,
    owner,
    product_image,
    product_details,
    product_price,
    product_name,
  } = offer;

  return (
    <div className="card" key={_id}>
      <div className="card-header">
        <img src={owner.account.avatar?.secure_url} alt="" />
        <p className="text-muted">{owner.account.username}</p>
      </div>

      <div className="card-body">
        <Link to={`/offer/${_id}`}>
          <img src={product_image.secure_url} alt={product_name} />
        </Link>
      </div>

      <div className="card-footer">
        <p className="price">{product_price} €</p>
        <p className="text-muted">{product_details[1].TAILLE}</p>
        <p className="text-muted">{product_details[0].MARQUE}</p>
      </div>
    </div>
  );
};

export default Card;
