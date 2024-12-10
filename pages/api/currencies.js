import axios from "axios"

export default async (req, res) => {
  const url = `https://api.exchangeratesapi.io/v1/2024-12-10?access_key=bc92112e343dfe65fdb46826e78df43b&symbols=USD,VND,AUD,CAD,CNY,MXN&format=1`
  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}

// https://api.exchangeratesapi.io/v1/latest?access_key=bc92112e343dfe65fdb46826e78df43b&base=USD&symbols=GBP,JPY,EUR
// https://api.exchangeratesapi.io/v1/2024-12-01?access_key=bc92112e343dfe65fdb46826e78df43b&symbols=USD,AUD,CAD,PLN,MXN&format=1