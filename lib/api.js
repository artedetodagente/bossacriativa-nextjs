const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {

  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPages() {
  const data = await fetchAPI(
    `
    query MyQuery {
      pages(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
        edges {
          node {
            id
            slug,
            title
          }
        }
      }
    }
    `,
    {
      variables: {},
    }
  )
  return data?.pages
}

export async function getPosts() {
  const data = await fetchAPI(
    `
    query MyQuery {
      posts {
        nodes {
          id
          slug
          title
        }
      }
    }
    `
  )
  return data?.posts
}
export async function getSinglePost(slug) {
  const data = await fetchAPI(`
  query MyQuery($slug: String) {
    posts(where: {name: $slug}) {
      nodes {
        id
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  }
  `,
  {
    variables: { slug },
  }
  )
  return data?.posts
}


export async function getLives() {
  const data = await fetchAPI(
    `
    query MyQuery {
      lives(first: 9999) {
        nodes {
          id
          slug
          title
          excerpt
          acf_data {
            videoUrl
          }
        }
      }
    }
    `
  )
  return data?.lives
}
export async function getSingleLive(slug) {
  const data = await fetchAPI(`
  query MyQuery($slug: String) {
    lives(where: {name: $slug}) {
      nodes {
        id
        slug
        title
        excerpt
        acf_data {
          videoUrl
        }
      }
    }
  }
  `,
  {
    variables: { slug },
  }
  )
  return data?.lives
}
