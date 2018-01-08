const React = require('react');

const MarkdownBlock = require('../../components/MarkdownBlock.js');

const Author = props => {
  const { site, post } = props;
  if (!post.author) { return null; }

  const theme = site.theme.blog;
  return (
    <div style={theme.authorBlock}>
      <div style={theme.authorName}>
        <a href={post.authorURL} target="_blank">{post.author}</a>
        {post.authorTitle}
      </div>
      <div style={theme.authorImgContainer}>
        <img src={post.authorImage} />
      </div>
    </div>
  );
}

const PostHeader = props => {
  const { site, post, url } = props;
  const theme = site.theme.blog;
  return (
    <header>
      <h2 style={theme.title}><a href={url}>{post.title}</a></h2>
      <p>{post.dtStr}</p>
      <Author site={site} post={post}/>
    </header>
  );
}

const PostContent = props => {
  const { post, site, truncate, url } = props;
  if (!truncate) { return <MarkdownBlock site={site}>{post.content}</MarkdownBlock> }

  return (
    <article>
      <MarkdownBlock site={site}>{post.brief}</MarkdownBlock>
      {post.brief === post.content && (
        <div className="read-more">
          <a className="button" href={url}> Read More </a>
        </div>
      )}
    </article>
  )
}

class BlogPost extends React.Component {
  render() {
    const { site, post, truncate } = this.props;
    const theme = site.theme.blog;
    const url = site.config.baseUrl + 'blog/' + post.path;
    return (
      <div style={theme.post}>
        <PostHeader site={site} post={post} url={url} />
        <PostContent site={site} post={post} truncate={truncate} url={url} />
      </div>
    );
  }
}

module.exports = BlogPost;
