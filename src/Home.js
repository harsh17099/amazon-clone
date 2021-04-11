import React from 'react'
import "./Home.css"
import Product from "./Product.js";

function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Events/250_cashback/3000x1200_Hero-Tall_NP._CB655856468_.jpg" alt=""/>
                <div className="home__row">
                <Product title="GIVA 925 Sterling Silver Falling Dew Necklace with Box Chain| Necklace for Women & Girls | With Certificate of Authenticity and 925 Hallmark
                by GIVA" price={17.99} image="https://m.media-amazon.com/images/I/31z9o1XYouL.jpg" 
                rating={3}/>
                
                <Product title="Juarez JRZ-ST01 6-String Electric Guitar, Right Handed, Full Black, with Case/Bag and Picks" price={89.99} image="https://m.media-amazon.com/images/I/71keXQiSnRL._AC_UL480_FMwebp_QL65_.jpg" 
                rating={4}/>

                </div>
                <div className="home__row">
                
                
                <Product title="Airpods Pro with Wireless Charging Case & Active Noise Cancellation,Charging Cable Compatible with iOS/Android" price={220.0} image="https://m.media-amazon.com/images/I/71IPFP9WJIL._AC_UL480_FMwebp_QL65_.jpg" 
                rating={4}/>
                <Product title="Nir Fashion Women's Faux Georgette Semi-stitched Anarkali Gown (Purple_Free Size)" price={11.99} image="https://images-na.ssl-images-amazon.com/images/I/414FlS3DaWL.jpg" 
                rating={5}/>
                <Product title="Vending India Gift Hamper - Ferrero Rocher 16 Pieces with (Ganesha Shadow Diya Stand)" price={19.99} image="https://images-eu.ssl-images-amazon.com/images/I/71uNpGYLbnL._AC_UL320_SR320,320_.jpg" 
                rating={5}/>

                </div>
                <div className="home__row">
                
                 <Product title="Samsung 1.5 Ton 3 Star Inverter Split AC (Copper, Convertible 5 in 1, HD Filter, 2021 Model, Floral pattern, AR18AYLYATB)" price={499.99} image="https://images-eu.ssl-images-amazon.com/images/I/31TQvqjXnEL._AC_SX368_.jpg" 
                rating={4}/>

                </div>
            </div>
        </div>
    )
}

export default Home
