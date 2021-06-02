const endpoint = "https://api.tradingeconomics.com/markets/commodities?c=guest:guest&format=json"

export default (req, res) => {
	res.status(200).json({
		commodity: 'Link' + endpoint
	})
}