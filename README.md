## ToDo
[X] Replacement Boiler Plate Content with Correct Collor Scheme

[X] Pull Commodities Content
https://api.tradingeconomics.com/markets/commodities?c=guest:guest&format=json

[X] Pull Currencies Content
https://api.tradingeconomics.com/markets/currency?c=blwvmxl5x1rk8qk:jodtirdtxtxvyld&cross=USD&format=json

[X] Pull Export by Countries
https://comtrade.tradingeconomics.com/comtrade/?r=mex&c=XX&t=2&treemap=categories&format=json

[X] JSON APIs for Exports, Currencies and Commodities
https://techblog.tomgreuter.nl/nextjs-api-routes/

[ ] Create Export Table Component with Country Export data
[ ] Load PIE Chart Export Data by Countries via Nivo Library
[ ] Create Countries Dropdown Component

[ ] Create Floating Stripe Component
[ ] Load Data From List of Countries

[ ] Create LOGO components
[ ] Refactor CODES in the Components


## Libraries to Use
- https://github.com/AndreasFaust/react-ticker 
- https://github.com/plouc/nivo

KEY:SECRET for Trading Economics
- Free Account  ==> blwvmxl5x1rk8qk:jodtirdtxtxvyld
- Guest Account ==> guest:guest


## Getting Started

First, run the development server at localhost:3000

```bash
yarn dev
```

API routes is accessible at http://localhost:3000/api/ping and editable at `pages/api/ping.js`


