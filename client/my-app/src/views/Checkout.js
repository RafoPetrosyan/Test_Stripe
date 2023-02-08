import {CardElement, CardNumberElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios"
import React, {useEffect, useState} from 'react'


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#000000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        },
        confirmCardSetup: ('{SETUP_INTENT_CLIENT_SECRET}', {
            payment_method: '{PAYMENT_METHOD_ID}',
        })
    }
}

export default function Checkout() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const clientInstance = stripe.elements({
        clientSecret: 'CLIENT_SECRET',
    });

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: clientInstance,
        // Fully customizable with appearance API.
        appearance: {/*...*/},
        elements: []
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(PaymentElement)
        })

        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 1000,
                    id
                })

                if(response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    // const geClientSecret = async () => {
    //     const {error, paymentMethod} = await stripe.createPaymentMethod({
    //         type: "card",
    //         card: elements.getElement(CardElement)
    //     })
    //     try {
    //         const {id} = paymentMethod
    //         const response = await axios.get("/secret", {params: {id}})
    //         console.log(response)
    //         return response
    //     } catch (e) {
    //         //
    //     }
    // }
    //
    // useEffect(() => {
    //     geClientSecret().then(r => console.log(323222))
    // }, [])

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                           <PaymentElement options={options} />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
                :
                <div>
                    <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
                </div>
            }

        </>
    )
}
