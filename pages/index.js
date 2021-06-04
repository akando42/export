import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Ticker from 'react-ticker'
import NumberFormat from 'react-number-format'

export default function Home({products}) {
  return (
    <div className={styles.container}>
      <div className={styles.export}>
        <div className={styles.table}>
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
            products.map((product) => (
              <div className={styles.tableRow}>
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
          Chart
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.logo}>
          <Image 
            src="/TElogo.png"
            alt="Trading Economic Logo"
            height='100vh'
            width='auto'
          />
        </div>
        <div className={styles.floating}>
          <div className={styles.currencies}>
            Currencies
          </div>
          <div className={styles.commodities}>
            Commodities
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://trading-economics-export.netlify.app/api/exports') 
  const products = await response.json()
  return {
    props: {
      products
    }
  }
}