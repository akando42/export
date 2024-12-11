
import axios from "axios"

export default async (req, res) => {
  let {query, method} = req
  let corps = query.corps
  const url = `https://financialmodelingprep.com/api/v3/profile/${corps}?apikey=C0nnV4DbDeE3f8x224xsSgP6glPZz5tN`
  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}

// https://financialmodelingprep.com/api/v3/profile/BYDIF?apikey=C0nnV4DbDeE3f8x224xsSgP6glPZz5tN