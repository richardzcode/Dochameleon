const React = require('react');

const MarkdownBlock = require('../../core/MarkdownBlock.js');

const AuthorPhoto = props => {
  const { post } = props;
  if (!post.authorImage) { return null; }

  const className = 'authorPhoto' +
    (post.author && post.authorTitle ? ' authorPhoto-big' : '');
  return (
    <div className={className}>
      <a href={post.authorURL} target="_blank">
        <img src={post.authorImage} />
      </a>
    </div>
  );
}

const PostHeader = props => {
  const { site, post, url } = props;
  return (
    <header className="postHeader">
      <h1><a href={url}>{post.title}</a></h1>
      <p className="post-meta">{post.dtStr}</p>
      <div className="authorBlock">
        {post.author ? (
          <p className="post-authorName">
            <a href={post.authorURL} target="_blank">{post.author}</a>
            {post.authorTitle}
          </p>
        ) : null}
        <AuthorPhoto post={post}/>
      </div>
    </header>
  );
}

const PostContent = props => {
  const { post, site, truncate, url } = props;
  if (!truncate) { return <MarkdownBlock>{post.content}</MarkdownBlock> }

  return (
    <article className="post-content">
      <MarkdownBlock>{post.brief}</MarkdownBlock>
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
    const url = site.config.baseUrl + 'blog/' + post.path;
    return (
      <div className="post">
        <PostHeader site={site} post={post} url={url} />
        <PostContent site={site} post={post} truncate={truncate} url={url} />
      </div>
    );
  }
}

module.exports = BlogPost;
