import {loadStripe} from '@stripe/stripe-js'
let stripePromise
const getStripe = () => {
    if (!streipePromise){
        stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)
    }
    return stripePromise
}

export default getStripe