import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Payment() {

  const location = useLocation();
  const { title, price } = location.state || {}

  console.log("Prix avant option", price)
  const options = {
  mode: "payment",
  title: title,
  amount: Number((price * 100).toFixed(0)),
  currency: "eur",
};
  console.log("Prix après option", price)

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );

}

export default Payment

// y a une histoire price a filer en props
// et
// de token pour only loged-in user can buy
