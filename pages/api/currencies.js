import axios from "axios"

export default async (req, res) => {
  const url = `https://api.tradingeconomics.com/markets/currency?c=blwvmxl5x1rk8qk:jodtirdtxtxvyld&cross=USD&format=json`
  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}