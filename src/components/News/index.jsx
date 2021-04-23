import React, { useEffect } from 'react';
import CardImageWithText from '@/components/CardImageWithText';
import FlatList from '@/components/FlatList';
import { request } from 'graphql-request';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const News = ({ after, action }) => {
  const { push } = useRouter();
  const apiUrl = 'https://wp-admin.bossacriativa.art.br/graphql';
  const queryString = `
      query($after: String){
        posts(first: 9,
              after: $after,
              where: {
                orderby: {field: DATE, order: DESC}
              }) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            slug
            title
            acf_chamada_post {
              chamadaHome
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
      }
    }`;

  const params = { after };

  const fetcher = (query) => request(apiUrl, query, params);

  const { data, error } = useSWR([queryString, after], fetcher);

  if (error) return <div>erro</div>;
  if (!data) return <div>Carregando...</div>;

  action(data.posts.pageInfo.endCursor, data.posts.pageInfo.hasNextPage);

  return (
    <FlatList
      source={data.posts.nodes}
      cols={3}
      renderItem={(item) => (
        <CardImageWithText
          title={item.title}
          excerpt={item.acf_chamada_post?.chamadaHome}
          image={item.featuredImage?.node?.mediaItemUrl}
          click={() => push(`noticias/${item.slug}`)}
        />
      )}
    />
  );
};

export default News;
