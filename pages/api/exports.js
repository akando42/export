import axios from "axios"

export default async (req, res) => {
  const url = `https://comtrade.tradingeconomics.com/comtrade/?r=usa&c=XX&t=2&treemap=categories&format=json`
  await axios
    .get(url)
    .then(({ data }) => {
      let products = data.sort(function(a,b){
        return b.value - a.value
      })
      res.status(200).json(products)
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}