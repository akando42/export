import axios from "axios"
import {Firestore} from "@google-cloud/firestore"

export default async (req, res) => {
	const firestore = new Firestore()

	const document = firestore.doc('posts/intro-to-firestore');
	const doc = await document.get()

	console.log("The doc", doc)
}