import axios from "axios"

export default async (req, res) => {
  const url = `https://comtrade.tradingeconomics.com/comtrade/?r=mex&c=XX&t=2&treemap=categories&format=json`
  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}