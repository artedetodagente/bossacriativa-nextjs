import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { getPosts, getVideos } from '../lib/api'
import YouThumb from '../components/YouThumb'

export default function Home({posts,videos}) {
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
        <h3>Vídeos</h3>
        {videos.map(video => <Link href={`/videos/${video.slug}`}><a><YouThumb url={video.acf_videos.youtube} /></a></Link>)}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  const videos = await getVideos()
  return {
    props: {
      posts: posts.nodes || [],
      videos: videos.nodes || [],
    },
    revalidate: 1
  }
}