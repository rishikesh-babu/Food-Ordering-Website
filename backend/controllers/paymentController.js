const Stripe = require('stripe')
const stripe = new Stripe(process.env.Stripe_Private_Api_Key)
const client_domain = process.env.CLIENT_DOMAIN

async function createCheckout(req, res, next) {
    try {
        console.log('Routes: checkout payment')

        const { products } = req.body

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product?.foodId?.name,
                    images: [product?.foodId?.image],
                },
                unit_amount: Math.round(product?.foodId?.price * 100),
            },
            quantity: product.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        })

        res.json({ success: true, sessionId: session.id })
    } catch (err) {
        console.log('err :>> ', err);
        res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error -payment failed' })
    }
}

module.exports = { createCheckout }