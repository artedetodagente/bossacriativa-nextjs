import next from 'next'
import Head from 'next/head'
import Link from 'next/link'
import parse from 'html-react-parser'

import styles from '../../styles/Home.module.css'

import { getPosts, getSinglePost } from '../../lib/api'

export default function Home({post}) {
  
  return (
    <>
      <Head>
        <title>{post?.title} - Bossa Criativa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h3><Link href="/">Bossa Criativa</Link></h3>
        <h1>{post?.title}</h1>
        <div className="content">
          {parse(post.content)}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const data = await getSinglePost(params.slug)
  return {
    props: {
      post: data.nodes[0],
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const data = await getPosts()
  return {
    paths: data.nodes.map(node => `/noticias/${node.slug}`) || [],
    fallback: false
  }
}
