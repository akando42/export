import axios from "axios"
import db from '../../lib/firestore';
import { collection, getDocs } from "firebase/firestore"

export default async (req, res) => {
	try {
		const query = await getDocs(
			collection(db, "stocks")
		)
		console.log("Query", query)
		res.status(200).json({ query})

	} catch (err){
		console.log("ERR", err)
		res.status(400).json({ err })
	}

	
}