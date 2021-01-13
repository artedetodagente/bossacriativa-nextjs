import React from 'react';
import YouThumb from '@/components/YouThumb';
import List from '@/components/List';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
// import { getPosts, getLives } from '@/services/api';

export default function Tests({ posts, lives }) {
  return (
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
  );
}

export async function getStaticProps() {
  // const posts = await getPosts();
  // const lives = await getLives();
  return {
    props: {
      posts: [],
      lives: [],
    },
    revalidate: 1,
  };
}
