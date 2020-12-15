import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Page() {
  const router = useRouter()
  const { page } = router.query
  return (
    <div className={styles.container}>
      <Head>
        <title>{page} - Bossa Criativa</title>
      </Head>
      Page: {page}
      <Link href="/">home</Link>
    </div>
  )
}
