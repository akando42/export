const endpoint = "https://comtrade.tradingeconomics.com/comtrade/?r=mex&c=XX&t=2&treemap=categories&format=json"

export default(req, res) => {
	res.status(200).json({
		export: 'Link: ' + endpoint
	})
}
