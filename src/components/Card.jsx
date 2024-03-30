

const Card = ({offer}) => {
  const {_id, owner, product_image, product_details, product_price} = offer;
  return (
    <>
    <div className="card" key={_id}>
      <div className="card-header">
        <h3 className="text-muted">Card header</h3>
      </div>

      <div className="card-body">
        <img src="" alt="" />
      </div>

      <div className="card-footer">
        <p>2 days ago</p>
        <p className="text-muted">blabla</p>
      </div>
    </div>
  </>
  )
}

export default Card
