import axios from "axios"
import { SearchBoxCore, SessionToken, SearchSession} from '@mapbox/search-js-core'

export default async (req, res) => {
	let {query, method} = req
	let addressQuery = query.address

	try {
		console.log("Address ", addressQuery)
		const search = new SearchBoxCore(
			{ accessToken: 'sk.eyJ1IjoiaGlsbG9kZXNpZ24iLCJhIjoiY200cG1qb2ZvMHIzcTJtc25yeHh5MDJoNiJ9.SvqLc-_pTVFgtPzQN8I-lA' }
		);
		console.log("Search \n", search)

		const sessionToken = new SessionToken();
		console.log("TOKEN \n", sessionToken)

		const results = await search.suggest(
			'UnitedHealth Group 55343', 
			{ sessionToken }
		);

		const suggestion = results.suggestions[0];
		const { features } = await search.retrieve(suggestion, { sessionToken });

		console.log("Features ", features)

		res.status(200).json({
			message: "Success", 
			address: "UnitedHealth Group Incorporated 55343", 
			location: features,
			full_results: results
		})

	} catch(err){
		res.status(400).json(
			{err}
		)
	}
}