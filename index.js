// const express = require('express')
const cheerio = require('cheerio')
// const fetch = require('node-fetch')
const request = require('request-promise-native')
// const app = express()
const pharmacies = [
  {
    name: 'ePharmacy',
    protocol: 'https',
    domain: 'epharmacy.com.au',
    path: 'product.asp?id=',
    selector: '.ProductPage_PrescPrices_PriceTag',
  },
  {
    name: 'Chemist Warehouse',
    protocol: 'https',
    domain: 'chemistwarehouse.com.au',
    path: 'buy/',
    selector: '.presc_boxprice',
  },
  // {
  //   name: 'Greg\'s Chemist',
  //   protocol: 'https',
  //   domain: 'gregs.com.au',
  //   path: 'catalogue/',
  //   selector: '.presc_boxprice',
  // }
  {
    name: 'Chemist Di$count Centre',
    protocol: 'https',
    domain: 'chemistdiscountcentre.com.au',
    path: 'buy/',
    selector: '.presc_boxprice',
  }
]

// https://www.epharmacy.com.au/inc_product_updater_json_shortlive.asp?callback=jQuery16202289283932047066_1535545875270&ID=62664&rand=52&_=1535545875391
// https://www.chemistdiscountcentre.com.au/breeze/frontend/FilteredProducts
// #!/prod/110050/valdoxan-25mg-tablets-28

const drugs = [
  {
    name: 'Valdoxan',
    id: 62664,
  }
]

async function getData(id) {
  return await Promise.all(pharmacies.map(async ({
    name, protocol, domain, path, selector
  }) => {
    const html = await request(`${protocol}://${domain}/${path}${id}`).catch(console.error)
    const $ = cheerio.load(html)
    return $(selector).text().trim().split(/\s/)[0];
  }))
}
// app.get('/', async (req, res) => {
//   res.send('hello world')
// })

// app.listen(3000, () => console.log('Example app listening on port 3000!'))

getData(62664).then(console.log)