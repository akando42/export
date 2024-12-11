import axios from "axios"

export default async (req, res) => {
  let today = new Date()
  let yesterday = new Date(today - 86400000); 
  let year = yesterday.getFullYear()
  let month = yesterday.getMonth() + 1
  let date = yesterday.getDate()
  let yesterdayString = `${year}-${month}-${date}`
  console.log("YES", yesterdayString)
  let currencyBasket = 'CAD,USD,JPY,KRW,CNY,MMK,VND,LAK,KHR,THB,AUD,GBP,MXN'
  const url = `https://api.exchangeratesapi.io/v1/${yesterdayString}?access_key=bc92112e343dfe65fdb46826e78df43b&symbols=${currencyBasket}&format=1`
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