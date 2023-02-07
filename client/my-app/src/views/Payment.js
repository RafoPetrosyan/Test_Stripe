import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Checkout";

const PUBLIC_KEY = "pk_test_51MYmLHDqDqcN4yZvb0cVShhZrNMe40pVqK6A9OamUEry2TZKYO1G7ndT7L61CAS3nNdwLjHc1m7rPgYZTZNe61bd002iZ8CbOd"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

function Payment() {
    return (
        <>
            <h1>React Stripe and the Payment Element</h1>
            {stripeTestPromise && (
                <Elements stripe={stripeTestPromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default Payment;
