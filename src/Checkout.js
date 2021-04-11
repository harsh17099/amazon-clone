import React from 'react'
import "./Checkout.css";
import Subtotal from './Subtotal';
import {useStateValue} from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
    const [{basket, user }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="data:image/jpeg;base64,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" alt=""/>
            
                <h3>Hello, {!user ? 'Guest' : user.email}</h3>
                
                <div> <h2 className="checkout__title">
                
                    Your Shopping Basket
                </h2>
                {basket.map(item =>(
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
            <div className="checkout__right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout