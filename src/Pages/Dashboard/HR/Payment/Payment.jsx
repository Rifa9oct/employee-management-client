import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = ({item}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
               <CheckoutForm item={item}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;