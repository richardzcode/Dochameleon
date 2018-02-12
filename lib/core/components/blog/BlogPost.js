const React = require('react');

const social = require('./social.js');
const MarkdownBlock = require('../MarkdownBlock.js');

const Author = props => {
  const { site, post, lang } = props;
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
          {site.i18n.translate(author.name, lang)}
          {site.i18n.translate(author.title, lang)}
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
  const { site, post, url, lang } = props;
  const theme = site.theme.blog;
  return (
    <header>
      <h2 style={theme.title}>
        <a style={theme.titleLink} href={url}>
          {site.i18n.translate(post.title, lang)}
        </a>
      </h2>
      <p>{post.dtStr}</p>
      <Author site={site} post={post} lang={lang}/>
    </header>
  );
}

const PostContent = props => {
  const { post, site, truncate, url, lang } = props;
  const theme = site.theme.blog;
  if (!truncate) { return <MarkdownBlock site={site} lang={lang}>{post.content}</MarkdownBlock> }

  return (
    <article>
      <MarkdownBlock site={site} truncate={truncate} lang={lang}>{post.brief}</MarkdownBlock>
      {post.brief !== post.content && (
        <div style={theme.readMore}>
          <a href={url}>{site.i18n.translate('Read More', lang)}</a>
        </div>
      )}
    </article>
  )
}

class BlogPost extends React.Component {
  render() {
    const { site, post, truncate, lang } = this.props;
    const theme = site.theme.blog;
    return (
      <div style={theme.post}>
        <PostHeader site={site} post={post} url={post.permalink(lang)} lang={lang} />
        <PostContent site={site} post={post} truncate={truncate} url={post.permalink(lang)} lang={lang} />
      </div>
    );
  }
}

module.exports = BlogPost;
