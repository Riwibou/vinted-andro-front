import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";

const CheckoutForm = ({title, price}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIsDone, setPaymentIsDone] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/v2/payment', {
          title: title,
          amount: price,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching clientSecret:", error);
        setErrorMessage("An error occurred while processing your payment.");
      }
    };

    fetchClientSecret();
  }, [title, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!stripe || !elements || !clientSecret) {
        return;
      }

      const cardElement = elements.getElement(PaymentElement);
      const { error: submitError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (submitError) {
        setErrorMessage(submitError.message);
        setIsLoading(false);
        return;
      }


      setPaymentIsDone(true);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while processing your payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return paymentIsDone ? (
    <p>Merci pour votre achat</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Payer
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
