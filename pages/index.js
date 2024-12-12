import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Ticker from 'react-ticker'
import NumberFormat from 'react-number-format'
import { ResponsivePieCanvas } from '@nivo/pie'
import axios from "axios"
import {Component} from "react"
import Map from "../components/Map"


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
      countryData: {
        'lng': 105,
        'lat': 21
      },
      products: [], 
      topProducts: [],
      currencies: [],
      slidingBasket: [],
      companies: [
        {
          'country':'usa',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'chn',
          'currency': '',
          'megacorps': [`TCEHY`,`PTR`,`IDCBY`,`BABA`, `CICHY`, `PNGAY`, `BIDU`, `JD`, `PDD`, `CIHKY`]
        },
        {
          'country':'jpn',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'deu',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'ind',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'gbr',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'fra',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'ita',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'bra',
          'currency': '',
          'megacorps': []
        },
        {
          'country':'rus',
          'currency': '',
          'megacorps': []
        }
      ], 
      stocks: [], 
      stockBasket: []
    }

    this.pullData = this.pullData.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.pullExchanges = this.pullExchanges.bind(this)
    this.pushCurrencySlide = this.pushCurrencySlide.bind(this)
    this.pullCompanies = this.pullCompanies.bind(this)
  }

  async pullData(selectedCountry){
    axios.get(`/api/exports?country=${selectedCountry}`).then(res => {
      // console.log("Products \n",res.data)
      let products = res.data
      var totalExport = products.map(product => product.value).reduce((total, value) => total + value)
      var chartData = []
      let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      const topProducts = products.slice(0,10)



      topProducts.map((product) => {
        
        let value = (product.value/totalExport*100).toFixed(2)
        let name = product.cat_name
        let inMillion = USDollar.format(value)
         console.log(inMillion)
        chartData.push({
          id: name, 
          value: value, 
          valueFormat: inMillion
        })
      })

      this.setState({
        products: products, 
        topProducts: chartData
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
      // console.log("Currencies", res.data.data.eur)
      let currencyData = res.data.data.eur
      let selectedBasket = [`CAD`,`USD`,`JPY`,`KRW`,`CNY`,`MMK`,`VND`,`LAK`,`KHR`,`THB`,`AUD`,`GBP`,`MXN`,'BRL','INR']
      let currencyBasket = []
      for (const key in currencyData) {
        // console.log(key, currencyData[key])
        if (selectedBasket.includes(key.toUpperCase())){
          currencyBasket.push({
            'name': key,
            'rate': currencyData[key]
          })
        }
      }

      let slidingBasket = []
      for(let i = 0; i < 10; i++){
        slidingBasket = slidingBasket.concat(currencyBasket)
      }

      this.setState({
        currencies: currencyBasket, 
        slidingBasket: slidingBasket
      })
    })
  }

  async pushCurrencySlide(){
     let currrentBasket = this.state.currencies
     console.log(currrentBasket)
     this.setState({
       slidingBasket: this.state.slidingBasket.concat(currrentBasket)
     })
  }

  async pullCompanies(){
    let chnCorps = this.state.companies.filter(company => company.country === `chn`)[0]['megacorps']
    let queryString = chnCorps.join(",")
    console.log(queryString)
    await axios
      .get(`/api/companies?corps=${queryString}`)
      .then(res => {
        let stocks = res.data.data
        console.log(stocks)
        let stockBasket = []
        for(let i = 0; i < 10; i++){
          stockBasket = stockBasket.concat(stocks)
        }
        this.setState({
          stocks: stocks, 
          stockBasket: stockBasket
        })
      })
    
  }

  componentDidMount(){
    this.pullData('usa')
    this.pullExchanges()
    this.pullCompanies()
    // setInterval(console.log("Updating"), 1000);
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

            <div className={styles.tableData}>
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
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.map}>
              <Map 
                width="32vw"
                height="38vh"
                data={this.state.countryData}
                zoom="2" 
                lng="90.09105767050022"
                lat="12.74421786982952"
              />       
            </div>
            <div className={styles.chart}>
              <ResponsivePieCanvas
                  data={this.state.topProducts}
                  margin={{ top: 10, bottom: 10, right: 10,  left: 10 }}
                  innerRadius={0.2}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ scheme: 'blues' }}
                  borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
                  enableArcLinkLabels={false}
                  enableArcLabels={false}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#000"
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
              />
            </div>
          </div>

        </div>
        <footer className={styles.footer}>
          <img 
            className={styles.logo}
            src="/TElogo.png"
          />
          <div className={styles.floating}>
            <div className={styles.currencies}>
              <div className={styles.slideLeft}>
                {
                  this.state.slidingBasket.map((currency) => {
                    let curr = currency.name.toUpperCase()
                    let rate = currency.rate.toFixed(2)
                    let color = '#'
                    return (
                      <div className={styles.currency}>
                        <span className={styles.symbol}>{curr}</span>
                        <span className={styles.rate}>{rate}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className={styles.commodities}>
              <div className={styles.slideRight}>
                {
                  this.state.stockBasket.map((stock) => {
                    let price = stock.price
                    let change = (stock.changes/stock.price * 100).toFixed(2)
                    
                    return (
                      <div className={styles.stock}>
                        <span className={styles.stockSymbol}>{stock.symbol}</span>
                        <span className={styles.price}>{price}</span>
                        {
                          change < 0
                          ? <div className={styles.changeIndicator}>
                              <span className={styles.triangleDown}></span>
                              <span className={styles.negChange}>{change}%</span>
                            </div>
                          : <div className={styles.changeIndicator}>
                              <span className={styles.triangleUp}></span>
                              <span className={styles.posChange}>{change}%</span>
                            </div>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}