const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")('sk_test_51MYmLHDqDqcN4yZvsybwNbWjA0tGJeAFxTfLuXQTD0hcpDhwNGLtN1JLPa06Ig5q4wNd15D2XHRD4Xl5l9iZcIVp00EYtav23o')
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(4000, () => {
	console.log("Sever is listening on port 4000")
})
