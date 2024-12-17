import axios from "axios"
import db from "../../lib/firestore"
import { collection } from "firebase/firestore"

export default async (req, res) => {
	try {
		let { query, method } = req
		let stocks = req.body
		
		console.log(
			"STOCKS\n",
			stocks
		)

		res.status(200).json({
			success: true, 
			stocks: stocks
		})
	} catch(err){
		res.status(400).json({err})
	}
}