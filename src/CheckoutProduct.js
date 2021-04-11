import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'
import FlipMove from 'react-flip-move';

function CheckoutProduct({id, image, title, price, rating}) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () =>{
        //remove item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <FlipMove typeName={null}>
        <div key="a" className="checkoutProduct">
            <img key="b" className="checkoutProduct__image" src={image}/>
            <div key="c" className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) => (<p>⭐</p>))}
                </div>
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
        </FlipMove>
    )
}

export default CheckoutProduct
