import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Timeline() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Timeline - Bossa Criativa</title>
      </Head>
      Timeline
      <Link href="/">home</Link>
    </div>
  )
}
