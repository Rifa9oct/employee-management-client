import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { GrValidate } from "react-icons/gr";
import Swal from "sweetalert2";


const CheckoutForm = ({ item }) => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const totalSalary = parseInt(item.salary);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { salary: totalSalary })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, totalSalary])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError("");
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: item.email || "anonymous",
                    name: item.name || "anonymous"
                }
            }
        })
        if (confirmError) {
            console.log("confirm error")
        }
        else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                const payment = {
                    name: item.name,
                    email: item.email,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    amount: totalSalary,
                    month: month,
                    year: year
                }
                const res = await axiosSecure.post("/payments", payment);
                console.log(res);
               if(res.data?.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your payment successfully done",
                    showConfirmButton: false,
                    timer: 1500
                  });
               }
            }
        }
    };

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-evenly items-center mb-8">
                    <div>
                        <label className="font-bold">Month: <br /></label>
                        <select id="month" value={month} onChange={handleMonthChange} className="border-2 px-3 mt-1 rounded border-cyan-400 w-[150px] p-1 ">
                            <option value="">Select Month</option>
                            {months.map((m, index) => (
                                <option key={index} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-bold">Year: <br /></label>
                        <input type="number" id="year" value={year} onChange={handleYearChange} placeholder="Enter year" className="w-[150px] border-2 px-3 mt-1 rounded border-cyan-400 focus:outline-none p-1"
                        />
                    </div>
                </div>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-center">
                    <button
                        disabled={!item.verified || !clientSecret || !stripe}
                        className="btn btn-sm px-7 my-8 text-white bg-gradient-to-r to-cyan-400 from-blue-400 shadow-lg border-0 shadow-blue-500/50 hover:bg-gradient-to-r hover:to-cyan-500 hover:from-blue-500">Pay</button>
                </div>
                {error && <p className="text-red-600"><MdError className="text-lg inline" />{error}</p>}
                {transactionId && <p className="text-green-600"><GrValidate className="text-lg inline" /> Your transation id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;