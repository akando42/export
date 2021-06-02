const te = require('tradingeconomics');
const endpoint = 'https://api.tradingeconomics.com/markets/currency?c=blwvmxl5x1rk8qk:jodtirdtxtxvyld&cross=USD&format=json'

export default (req, res) => {
	te.login('blwvmxl5x1rk8qk:jodtirdtxtxvyld')
	res.status(200).json({
		currency: "Link: " + endpoint
	})
}