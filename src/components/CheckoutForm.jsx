// CheckoutForm.jsx
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIsDone, setPaymentIsDone] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!stripe || !elements) {
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

      // Handle payment success
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
