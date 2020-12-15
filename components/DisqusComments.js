import {DiscussionEmbed} from "disqus-react"

const DisqusComments = ({ post }) => {
  const disqusShortname = 'bossa-criativa'
  const disqusConfig = {
    url: post.path,
    identifier: post.id,
    title: post.title
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;