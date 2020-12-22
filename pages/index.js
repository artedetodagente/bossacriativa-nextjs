import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { getPosts, getLives } from '../lib/api'
import YouThumb from '../components/YouThumb'

export default function Home({posts,lives}) {
  return (
    <>
      <Head>
        <title>Bossa Criativa - Arte de Toda Gente</title>
      </Head>
      <div className={styles.container}>
        <h1>Bossa Criativa</h1>
        <h3>Posts</h3>
        <ul>
          {posts.map(post => <li><Link href={`/noticias/${post.slug}`}>{post.title}</Link></li>)}
        </ul>
        <h3>Lives</h3>
        {lives.map(live => <Link href={`/lives/${live.slug}`}><a><YouThumb url={live.acf_data.videoUrl} /></a></Link>)}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  const lives = await getLives()
  return {
    props: {
      posts: posts.nodes || [],
      lives: lives.nodes || [],
    },
    revalidate: 1
  }
}