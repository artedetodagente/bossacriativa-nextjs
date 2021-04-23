import React from 'react';
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

  return (
    <>
      <input name="endCursor" type="hidden" value={data.posts.pageInfo.endCursor} />
      <input name="hasNext" type="hidden" value={data.posts.pageInfo.hasNextPage} />
      <FlatList
        hasNext={data.posts.pageInfo.hasNextPage}
        endCursor={data.posts.pageInfo.endCursor}
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
      {
        data.posts.pageInfo.hasNextPage
          ? (
            <input
              type="button"
              name="more"
              onClick={() => action(data.posts.pageInfo.endCursor)}
              value="mais notícias"
            />
          )
          : ''
      }
    </>
  );
};

export default News;
