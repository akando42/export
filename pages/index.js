import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.export}>
        Export Panel
      </div>

      <footer className={styles.footer}>
        Logo, Currencies and Commodities Stripe
      </footer>
    </div>
  )
}
