import { Link, useParams } from "react-router-dom";

const Offer = () => {

  const {id} = useParams();
  return (
    <>
    <div className="Offer">
      <h2>offer page</h2>
      <p> je suis une offre avec un id : {id}</p>
      <Link to="/">lien vers la home page</Link>

    </div>
    </>

  )
}

export default Offer
