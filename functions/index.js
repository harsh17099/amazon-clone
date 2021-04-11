const functions = require("firebase-functions");
const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors
const stripe = require("stripe")('sk_test_51IeDiXSCjIwtZNt0h1QAlHDAhBg81Pvfi4QiHSzNfoBR15BOFktRjZuoErlu9FynAJMImt8QpNQrkd3Pbxf3cOFP00btgVKIKk'); /* secret API key*/ // npm i stripe

// To set up an API

// -App config
    const app = express();

// -Middlewares
    app.use(cors({ origin: true }));
    app.use(express.json());

// -API routes
    app.get('/', (request, response) => response.status(200).send('helloworld'))

    //app.get('/take_me_away', (request, response) => response.status(200).send(' we are here, Hello Harsh!'))
    
    app.post('/payments/create', async (request, response) => {
        const total = request.query.total;

        console.log('Payment Request accepted for amount :', total)

        const paymentIntent = await stripe.PaymentIntents.create({
            amount: total,
            currency: "usd",
            //payment_method_options: "card"
        });
        //201 means OK- created
        response.status(201).send({
            clientSecret: paymentIntent.client_secret,
        })
    })

// -Listen commmand
    exports.api = functions.https.onRequest(app) // to run the API -> firebase emulators: start

    // http://localhost:5001/clone-ac1a2/us-central1/api