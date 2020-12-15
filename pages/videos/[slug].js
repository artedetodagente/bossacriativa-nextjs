import next from 'next'
import Head from 'next/head'
import Link from 'next/link'
import parse from 'html-react-parser'

import styles from '../../styles/Home.module.css'

import { getVideos, getSingleVideo } from '../../lib/api'
import YouEmbed from '../../components/YouEmbed'
import DisqusComments from '../../components/DisqusComments'

export default function Home({video}) {
  
  return (
    <>
      <Head>
        <title>{video?.title} - Bossa Criativa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h3><Link href="/">Bossa Criativa</Link></h3>
        <h1>Vídeo: {video?.title}</h1>
        <YouEmbed url={video?.acf_videos?.youtube} />
        <div className="content">
          {parse(video?.excerpt || '')}
        </div>
        <DisqusComments post={{...video, path: `${process.env.NEXT_PUBLIC_URL}videos/${video?.slug}`}} />
      </div>
    </>
  )
}

export async function getStaticProps({params}) {
  const data = await getSingleVideo(params.slug)
  return {
    props: {
      video: data.nodes[0]
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const data = await getVideos()
  return {
    paths: data.nodes.map(node => `/videos/${node.slug}`) || [],
    fallback: true
  }
}

