import React from 'react';
import Link from 'next/link';
import Page from '@/components/Page';
import List from '@/components/List';
import styles from '@/styles/Home.module.css';
import { getPosts, getLives } from '@/services/api';
import YouThumb from '@/components/YouThumb';

export default function Home({ posts, lives }) {
  return (
    <Page>
      <div className={styles.container}>
        <h1>Bossa Criativa</h1>
        <h3>Posts</h3>
        <List
          source={posts}
          renderItem={(item) => <Link href={`/noticias/${item.slug}`}>{item.title}</Link>}
        />
        <h3>Lives</h3>
        <List
          source={lives}
          renderItem={(item) => (
            <Link href={`/noticias/${item.slug}`}>
              <YouThumb url={item.acf_data.videoUrl} />
            </Link>
          )}
        />
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  const lives = await getLives();
  return {
    props: {
      posts: posts.nodes || [],
      lives: lives.nodes || [],
    },
    revalidate: 1,
  };
}
