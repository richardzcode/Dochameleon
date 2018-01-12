const React = require('react');

const social = require('./social.js');
const MarkdownBlock = require('../MarkdownBlock.js');

const Author = props => {
  const { site, post } = props;
  if (!post.author) { return null; }

  let author = {};
  if (post.authorGitHub) { 
    Object.assign(author, social.gitHubUser(post.authorGitHub));
  }
  if (post.authorFBID) {
    Object.assign(author, social.facebookUser(post.authorFBID));
  }
  if (post.authorTwitter) {
    Object.assign(author, social.twitterUser(post.authorTwitter));
  }
  author.name = post.author;
  author.title = post.authorTitle;
  if (post.authorUrl) { author.url = post.authorUrl }
  if (post.authorImage) { author.image = post.authorImage }

  const theme = site.theme.blog;
  return (
    <div style={theme.authorBlock}>
      <div style={theme.authorName}>
        <a style={theme.authorNameLink} href={author.url} target="_blank">
          {author.name}
          {author.title}
        </a>
      </div>
      {author.image &&
        <div style={theme.authorImgContainer}>
          <img src={author.image} />
        </div>
      }
    </div>
  );
}

const PostHeader = props => {
  const { site, post, url } = props;
  const theme = site.theme.blog;
  return (
    <header>
      <h2 style={theme.title}><a style={theme.titleLink} href={url}>{post.title}</a></h2>
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
    return (
      <div style={theme.post}>
        <PostHeader site={site} post={post} url={post.permalink} />
        <PostContent site={site} post={post} truncate={truncate} url={post.permalink} />
      </div>
    );
  }
}

module.exports = BlogPost;
