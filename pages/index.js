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
      selectedCountry: 'usa',
      selectedCurrency: 'usd',
      countryData: {lat: "38.9046802783378", lng: "-77.04410423472449"},
      products: [], 
      topProducts: [],
      currencies: [],
      slidingBasket: [],
      companies: [
        {
          'country':'usa',
          'currency': '',
          'megacorps': [`WMT`,`AMZN`,`AAPL`,`UNH`,`BRK.A`,`CVS`,`XOM`,`GOOGL`,`MCK`,`COR`]
        },
        {
          'country':'chn',
          'currency': '',
          'megacorps': [`TCEHY`,`PTR`,`IDCBY`,`BABA`,`CICHY`,`PNGAY`,`BIDU`,`JD`,`PDD`,`CIHKY`]
        },
        {
          'country':'jpn',
          'currency': '',
          'megacorps': [`TM`,`HMC`,`SONY`,`MC`,`MUFG`,`MFG`,`CJPRY`,`NMR`,`NSANF`,`ALPMY`]
        },
        {
          'country':'deu',
          'currency': 'eur',
          'megacorps': [`BAYRY`,`DTEGY`,`IMUX`,`DAI`,`DB`,`SAP`,`POAHY`,`VWAGY`,`HDELY`, `DHLGY`]
        },
        {
          'country':'ind',
          'currency': '',
          'megacorps': [`INFY`, `IBN`,`HDB`,`WIT`, `MMYT`, `RDY`, `WNS`, `SIFY`, `YTRA`, `ZCAR`]
        },
        {
          'country':'gbr',
          'currency': '',
          'megacorps': [`SHEL`,`BP`,`RIO`,`HSBC`,`LYG`,`ARM`,`VOD`,`AZN`,`BTI`,`DEO`,`LIN`,`UL`]
        },
        {
          'country':'fra',
          'currency': '',
          'megacorps': [`TTE`, `ORAN`, `SNY`, `CSTM`, `LRLCY`, `BNPQY`, `LVMUY`, `CRTO`, `DANOY`, `AXAHY`]
        },
        {
          'country':'ita',
          'currency': '',
          'megacorps': [`E`,`RACE`,`ZGN`,`STVN`,`UNCRY`,`ISNPY`,`PRDSY`,`PRYMY`,`TEZNY`,`ARZGY`]
        },
        {
          'country':'bra',
          'currency': '',
          'megacorps': [`PBR`,`ITUB`,`BBD`,`VALE`,`ABEV`,`GGB`,`VIV`,`SBS`,`ERJ`,`TIMB`]
        },
        {
          'country':'rus',
          'currency': '',
          'megacorps': []
        }
      ], 
      stocks: [], 
      stockBasket: [], 
      nations: ['usa','chn','jpn','deu','ind','gbr','fra','ita','bra','rus'],
      counter: 0,
      autoCode: 0,
      pieSampleData: [
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
    }

    this.pullData = this.pullData.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.pullExchanges = this.pullExchanges.bind(this)
    this.pushCurrencySlide = this.pushCurrencySlide.bind(this)
    this.pullCompanies = this.pullCompanies.bind(this)
    this.loopSelection = this.loopSelection.bind(this)
    this.startAuto = this.startAuto.bind(this)
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
        // console.log(inMillion)
        chartData.push({
          id: name, 
          value: value, 
          valueFormat: inMillion
        })
      })

      // const trigger = document.getElementById("trigger")
      // trigger.setAttribute("data-lat", this.state.countryData.lat)
      // trigger.setAttribute("data-lng", this.state.countryData.lng)
      // trigger.click()

      this.setState({
        products: products, 
        topProducts: chartData
      })
    })
  }

  async selectCountry(e){
    clearInterval(this.state.autoCode)

    console.log("SELECT COUNTRY ", e.target.value)
    let lng = e.target.options[e.target.selectedIndex].dataset.lng
    let lat = e.target.options[e.target.selectedIndex].dataset.lat

    console.log("Capital coordinate ",lng, lat)

    this.setState({
      selectedCountry: e.target.value,
      selectedCurrency: e.target.dataset.currency,
      countryData: {
        'lng': lng,
        'lat': lat
      }
    })

    const trigger = document.getElementById("trigger")
    trigger.setAttribute("data-lat", lat)
    trigger.setAttribute("data-lng", lng)
    trigger.click()

    this.pullData(e.target.value)
    this.pullExchanges(e.target.options[e.target.selectedIndex].dataset.currency)
    this.pullCompanies(e.target.value)
  }

  async flyTo(event){
    const lng = event.target.dataset.lng
    const lat = event.target.dataset.lat

    const trigger = document.getElementById("trigger")
    trigger.setAttribute("data-lat", lat)
    trigger.setAttribute("data-lng", lng)
    trigger.click()
  }

  async pullExchanges(baseCurrency){
    await axios.get(`/api/currencies?base=${baseCurrency}`).then(res => {
      // console.log("Currencies", res.data.data.eur)
      let currencyData = res.data.exchangeRate
      let selectedBasket = [`EUR`,`CAD`,`USD`,`JPY`,`KRW`,`CNY`,`MMK`,`VND`,`LAK`,`KHR`,`THB`,`AUD`,`GBP`,`MXN`,'BRL','INR']
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
     // console.log(currrentBasket)
     this.setState({
       slidingBasket: this.state.slidingBasket.concat(currrentBasket)
     })
  }

  async pullCompanies(countryCode){
    let corps = this.state.companies.filter(company => company.country === countryCode)[0]['megacorps']
    let queryString = corps.join(",")
    // console.log(queryString)
    await axios
      .get(`/api/companies?corps=${queryString}`)
      .then(res => {
        let stocks = res.data.data
        // console.log(stocks)
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

  async loopSelection(){    
    let nations = this.state.nations
    let counter = this.state.counter
    let selectedNation = nations[counter]
    const selector = document.getElementById("country_selector")
    let value = selector.options[counter].value
    let lng = selector.options[counter].dataset.lng
    let lat = selector.options[counter].dataset.lat

    selector.selectedIndex = counter
    selector.dispatchEvent(new Event('change'))

    console.log("SELECT ",selectedNation, counter, value, lng, lat)

    const trigger = document.getElementById("trigger")
    trigger.setAttribute("data-lat", lat)
    trigger.setAttribute("data-lng", lng)
    trigger.click()

    this.pullData(selectedNation)

    if (counter < 9){
      this.setState({
        counter: counter + 1
      })
    } else {
      this.setState({
        counter: 0
      })
    }
  }

  async startAuto(){
    let autoCode = setInterval(this.loopSelection, 8000)
    console.log("Interval CODE", autoCode)
    this.setState({
      autoCode: autoCode
    })
  }

  componentWillMount(){
    clearInterval(this.state.autoCode)
  }

  componentDidMount(){
    this.pullData('usa')
    this.pullExchanges(this.state.selectedCurrency)
    this.pullCompanies('usa')
    this.startAuto()
  }

  render(){
    return (
      <div className={styles.container}>

        <div className={styles.export}>
          <div className={styles.rightPanel}>
            <div className={styles.map}>
              <Map 
                width="32vw"
                height="38vh"
                data={this.state.countryData}
                zoom="1" 
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
                  colors={{ scheme: 'spectral' }}
                  borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
                  enableArcLinkLabels={false}
                  enableArcLabels={true}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#000"
                  arcLinkLabelsThickness={6}
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLabelsSkipAngle={10}
                  arcLabelsRadiusOffset={0.75}
                  arcLabelsTextColor="#121C2B"
                  arcLinkLabelsThickness={6}
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
                  legends={[
                      {
                          anchor: 'right',
                          direction: 'column',
                          justify: false,
                          translateX: 140,
                          translateY: 0,
                          itemsSpacing: 2,
                          itemWidth: 60,
                          itemHeight: 14,
                          itemTextColor: '#999',
                          itemDirection: 'left-to-right',
                          itemOpacity: 1,
                          symbolSize: 14,
                          symbolShape: 'circle'
                      }
                  ]}
              />
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableName}>
              <select 
                className={styles.selection}
                onChange={this.selectCountry}
                id="country_selector"
              >
                <option 
                  value='usa'
                  data-lng="-77.04410423472449"
                  data-lat="38.9046802783378"
                  data-currency="USD"
                > 
                  United States 
                </option>
                <option 
                  value='chn'
                  data-lng="116.40565993343536"
                  data-lat="39.90260546559617"
                  data-currency="CNY"
                >
                  China 
                </option>
                <option 
                  value='jpn'
                  data-lng="139.7449267536858"
                  data-lat="35.677182219118635"
                  data-currency="JPY"
                > Japan </option>
                <option 
                  value='deu'
                  data-lng="13.41305121178803"
                  data-lat="52.51884772950167"
                  data-currency="EUR"
                > Germany </option>

                <option 
                  value='ind'
                  data-lng="77.19593602326063"
                  data-lat="28.518579319021935"
                  data-currency="INR"
                > 
                  India 
                </option>

                <option 
                  value='gbr'
                  data-lng="-0.11465266233424798"
                  data-lat="51.502460331435785"
                  data-currency="GBP"
                > 
                  United Kingdom 
                </option>
                <option 
                  value='fra'
                  data-lng="2.3511543507860155"
                  data-lat="48.857266311821164"
                  data-currency="EUR"
                > 
                  France 
                </option>

                <option 
                  value='ita'
                  data-lng="12.489983230893142"
                  data-lat="41.90228734946103"
                  data-currency="EUR"
                >
                  Italy 
                </option>

                <option 
                  value='bra'
                  data-lng="-47.88242930280692"
                  data-lat="-15.800832822859613"
                  data-currency="BRL"
                >
                  Brazil
                </option>

                <option 
                  value='rus'
                  data-lng="37.67106783588022"
                  data-lat="55.7398329490853"
                  data-currency="RUB"
                >
                  Russia 
                </option>
              </select>
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