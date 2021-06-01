const te = require('tradingeconomics');

export default (req, res) => {
	te.login('blwvmxl5x1rk8qk:jodtirdtxtxvyld')
	res.status(200).json({
		currency: "cool: " + message 
	})
}