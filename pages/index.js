import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Ticker from 'react-ticker'
import NumberFormat from 'react-number-format'
import { ResponsivePieCanvas } from '@nivo/pie'
import axios from "axios"
import {Component} from "react"


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      pieData: [
        {
          "id": "erlang",
          "label": "erlang",
          "value": 320,
          "color": "hsl(22, 70%, 50%)"
        },
        {
          "id": "php",
          "label": "php",
          "value": 256,
          "color": "hsl(69, 70%, 50%)"
        },
        {
          "id": "rust",
          "label": "rust",
          "value": 98,
          "color": "hsl(9, 70%, 50%)"
        },
        {
          "id": "stylus",
          "label": "stylus",
          "value": 575,
          "color": "hsl(256, 70%, 50%)"
        },
        {
          "id": "elixir",
          "label": "elixir",
          "value": 567,
          "color": "hsl(66, 70%, 50%)"
        },
        {
          "id": "css",
          "label": "css",
          "value": 477,
          "color": "hsl(207, 70%, 50%)"
        },
        {
          "id": "python",
          "label": "python",
          "value": 584,
          "color": "hsl(228, 70%, 50%)"
        },
        {
          "id": "sass",
          "label": "sass",
          "value": 132,
          "color": "hsl(178, 70%, 50%)"
        },
        {
          "id": "hack",
          "label": "hack",
          "value": 257,
          "color": "hsl(310, 70%, 50%)"
        },
        {
          "id": "javascript",
          "label": "javascript",
          "value": 437,
          "color": "hsl(287, 70%, 50%)"
        },
        {
          "id": "c",
          "label": "c",
          "value": 167,
          "color": "hsl(267, 70%, 50%)"
        },
        {
          "id": "lisp",
          "label": "lisp",
          "value": 446,
          "color": "hsl(191, 70%, 50%)"
        },
        {
          "id": "ruby",
          "label": "ruby",
          "value": 329,
          "color": "hsl(356, 70%, 50%)"
        },
        {
          "id": "scala",
          "label": "scala",
          "value": 437,
          "color": "hsl(58, 70%, 50%)"
        },
        {
          "id": "go",
          "label": "go",
          "value": 244,
          "color": "hsl(97, 70%, 50%)"
        },
        {
          "id": "make",
          "label": "make",
          "value": 136,
          "color": "hsl(251, 70%, 50%)"
        },
        {
          "id": "haskell",
          "label": "haskell",
          "value": 522,
          "color": "hsl(109, 70%, 50%)"
        },
        {
          "id": "java",
          "label": "java",
          "value": 168,
          "color": "hsl(20, 70%, 50%)"
        }],
      selectedCountry: 'usa',
      products: [], 
      topProducts: [],
      currencies: []
    }

    this.pullData = this.pullData.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.pullExchanges = this.pullExchanges.bind(this)
  }

  async pullData(selectedCountry){
    axios.get(`/api/exports?country=${selectedCountry}`).then(res => {
      console.log("Products \n",res.data)
      let products = res.data
      var totalExport = products.map(product => product.value).reduce((total, value) => total + value)
      const topProducts = products.slice(0,10)
      this.setState({
        products: products, 
        topProducts: topProducts
      })
    })
  }

  async selectCountry(event){
    console.log("SELECT COUNTRY ", event.target.value)
    this.setState({
      selectedCountry: event.target.value
    })

    this.pullData(event.target.value)
  }
  async pullExchanges(){
    await axios.get(`/api/currencies`).then(res => {
      console.log("Currencies", res.data.data.rates)
      let currencyData = res.data.data.rates
      let currencyBasket = []
      for (const key in currencyData) {
        console.log(key, currencyData[key])
        currencyBasket.push({
          'name': key,
          'rate': currencyData[key]
        })
      }

      this.setState({
        currencies: currencyBasket
      })
    })
  }

  componentDidMount(){
    this.pullData('usa')
    this.pullExchanges()
  }

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.export}>
          <div className={styles.table}>
            <div className={styles.tableName}>
              <select 
                className={styles.selection}
                onChange={this.selectCountry}
              >
                <option value='usa'> United States </option>
                <option value='chn'> China </option>
                <option value='jpn'> Japan </option>
                <option value='deu'> Germany </option>
                <option value='ind'> India </option>
                <option value='gbr'> United Kingdom </option>
                <option value='fra'> France </option>
                <option value='ita'> Italy </option>
                <option value='bra'> Brazil </option>
                <option value='rus'> Russia </option>
              </select>
              Exports by Categories
            </div>
            <div className={styles.tableRow}>
              <span className={styles.itemName}>
                <strong>Annual Exports by Categories </strong>
              </span>
              <span className={styles.itemValue}>
                <strong>Value</strong>
              </span> 
              <span className={styles.itemDate}>
                <strong> Year </strong>
              </span>
            </div>
            {
              this.state.products.map((product) => (
                <div className={styles.tableRow} key={product.symbol}>
                  <span className={styles.itemName}>
                    {product.cat_name}
                  </span> 

                  <span className={styles.itemValue}>
                    <NumberFormat value={product.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </span>
                  <span className={styles.itemDate}> 
                    {product.date}
                  </span>
                </div> 
              ))
            }
          </div>
          <div className={styles.chart}>
            <ResponsivePieCanvas
                data={this.state.topProducts}
                margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'paired' }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#333333"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
                // legends={[
                //     {
                //         anchor: 'top',
                //         direction: 'column',
                //         justify: false,
                //         translateX: 140,
                //         translateY: 0,
                //         itemsSpacing: 2,
                //         itemWidth: 60,
                //         itemHeight: 14,
                //         itemTextColor: '#999',
                //         itemDirection: 'left-to-right',
                //         itemOpacity: 1,
                //         symbolSize: 14,
                //         symbolShape: 'circle'
                //     }
                // ]}
            />
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.logo}>
            <Image 
              src="/TElogo.png"
              alt="Trading Economic Logo"
              height='100'
              width='100'
            />
          </div>
          <div className={styles.floating}>
            <div className={styles.currencies}>
              {
                this.state.currencies.map((currency) => {
                  let curr = currency.name
                  let rate = currency.rate.toFixed(2)
                  return (
                    <div className={styles.currency}>
                      <span className={styles.symbol}>{curr}</span>
                      <span className={styles.rate}>{rate}</span>
                    </div>
                  )
                })
              }
            </div>
            <div className={styles.commodities}>
              Commodities
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

// export async function getServerSideProps() {
//   const selectedCountry = "usa"
//   // const response = await fetch('/api/exports?country='+selectedCountry) 
//   // const products = await response.json()

//   let products = axios.get(`/api/exports?country=${selectedCountry}`)

//   var totalExport = products.map(product => product.value).reduce((total, value) => total + value)
//   const topProducts = products.slice(0,10)
  

//   for (var c = 0; c < topProducts.length; c++){
//       topProducts[c].id = topProducts[c].cat_name;
//       topProducts[c].label = topProducts[c].cat_name;
//       // topProducts[c].value = Math.floor(topProducts[c].value / totalExport * 100);
//   }

//   const pieData = [
//     {
//       "id": "erlang",
//       "label": "erlang",
//       "value": 320,
//       "color": "hsl(22, 70%, 50%)"
//     },
//     {
//       "id": "php",
//       "label": "php",
//       "value": 256,
//       "color": "hsl(69, 70%, 50%)"
//     },
//     {
//       "id": "rust",
//       "label": "rust",
//       "value": 98,
//       "color": "hsl(9, 70%, 50%)"
//     },
//     {
//       "id": "stylus",
//       "label": "stylus",
//       "value": 575,
//       "color": "hsl(256, 70%, 50%)"
//     },
//     {
//       "id": "elixir",
//       "label": "elixir",
//       "value": 567,
//       "color": "hsl(66, 70%, 50%)"
//     },
//     {
//       "id": "css",
//       "label": "css",
//       "value": 477,
//       "color": "hsl(207, 70%, 50%)"
//     },
//     {
//       "id": "python",
//       "label": "python",
//       "value": 584,
//       "color": "hsl(228, 70%, 50%)"
//     },
//     {
//       "id": "sass",
//       "label": "sass",
//       "value": 132,
//       "color": "hsl(178, 70%, 50%)"
//     },
//     {
//       "id": "hack",
//       "label": "hack",
//       "value": 257,
//       "color": "hsl(310, 70%, 50%)"
//     },
//     {
//       "id": "javascript",
//       "label": "javascript",
//       "value": 437,
//       "color": "hsl(287, 70%, 50%)"
//     },
//     {
//       "id": "c",
//       "label": "c",
//       "value": 167,
//       "color": "hsl(267, 70%, 50%)"
//     },
//     {
//       "id": "lisp",
//       "label": "lisp",
//       "value": 446,
//       "color": "hsl(191, 70%, 50%)"
//     },
//     {
//       "id": "ruby",
//       "label": "ruby",
//       "value": 329,
//       "color": "hsl(356, 70%, 50%)"
//     },
//     {
//       "id": "scala",
//       "label": "scala",
//       "value": 437,
//       "color": "hsl(58, 70%, 50%)"
//     },
//     {
//       "id": "go",
//       "label": "go",
//       "value": 244,
//       "color": "hsl(97, 70%, 50%)"
//     },
//     {
//       "id": "make",
//       "label": "make",
//       "value": 136,
//       "color": "hsl(251, 70%, 50%)"
//     },
//     {
//       "id": "haskell",
//       "label": "haskell",
//       "value": 522,
//       "color": "hsl(109, 70%, 50%)"
//     },
//     {
//       "id": "java",
//       "label": "java",
//       "value": 168,
//       "color": "hsl(20, 70%, 50%)"
//     }
//     ]

//   return {
//     props: {
//       products, pieData,topProducts
//     }
//   }
// }