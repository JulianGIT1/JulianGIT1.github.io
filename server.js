require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_your_secret_key_here'); // Replace with your secret key

const app = express();
app.use(express.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));



