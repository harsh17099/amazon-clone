import React, {useState, useEffect } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import {Link, useHistory} from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    // hooks for stripe functions
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => { //THIS PARTICULAR BLOCK IS VERY IMPORTANT AS WHENEVER THE BASKET UPDATES, THIS MAKES REQUEST TO CHANGE THE SPECIAL STRIPE SECRET WHICH ALOOWS US TO CHARGE CUTOMER THE CORRECT AMOUNT 
        // generate the special client secret which allows us to charge a customer
        const getClientSecret = async() =>{
            const response = await axios ({ // axios allows us to requset (POST,GET,etc.)
                method: 'post',
                // Stripes expects the total in currency subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

        console.log('The Secret is>>>', clientSecret);
        console.log('!!!!!', user);

    const handleSubmit = async (event) => {
       // do all the fancy stripe stuff..
        event.preventDefault();
        setProcessing(true); // will prevent you from pressing buy button multiple times

        //This is how the stripe knows how much to charge the customer
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment cpnfirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                    
                })
                

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('./orders')
        })

    }
    const handleChange = event =>{
             //  listen to changes in cardElement
        //and dispkay any error as the cutomer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>

                {/* Payment section- Delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address </h3>
                    <div className="payment__address">
                        <p>{user?.email}</p> {/* we use ? to do protective chaining, in case user is not defined */}
                        <p>420, The Great Nathuram Godsey Marg</p>
                        <p>Tanki k niche, Bhullanpura, USA</p>
                    </div>
                    </div>
                </div>

                {/* Payment section- Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery </h3>
                    </div>
                    <div className="payments__items">
                        {basket.map(item =>( /*for each item in basket map checkout product to the following props(id, title etc.) */
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section- Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method </h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                            <h3>Order Total:{value} </h3> 
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* rror */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Payment
