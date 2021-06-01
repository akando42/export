import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Ticker from 'react-ticker'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.export}>
        Export Panel
      </div>

      <footer className={styles.footer}>
        <div className={styles.logo}>
          <Image 
            src="/TElogo.svg"
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
