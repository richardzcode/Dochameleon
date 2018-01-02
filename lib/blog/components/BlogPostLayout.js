const React = require('react');

const Page = require('../../core/Page.js');
const Container = require('../../core/Container.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

const SocialButtons = props => {
  const { site, post } = props;

  const fbLike = site.config.facebookAppId ? (
    <div
      className="fb-like"
      data-layout="standard"
      data-share="true"
      data-width="225"
      data-show-faces="false"
    />
  ) : null;

  const twitterShare = site.config.twitter ? (
    <a
      href="https://twitter.com/share"
      className="twitter-share-button"
      data-text={post.title}
      data-url={site.rootUrl + 'blog/' + post.path}
      data-related={site.config.twitter}
      data-via={post.authorTwitter}
      data-show-count="false">
      Tweet
    </a>
    ) : null;

  if (!fbLike && !twitterShare) { return null; }

  return (
    <div>
      <aside className="entry-share">
        <div className="social-buttons">
          {fbLike}
          {twitterShare}
        </div>
      </aside>
    </div>
  );
}

class BlogPostLayout extends React.Component {
  render() {
    const { site, metadata, recent } = this.props;
    return (
      <Page
        site={site}
        title={metadata.title}
        description={metadata.brief}
        className="sideNavVisible"
        url={'blog/' + metadata.path}
      >
        <div className="docMainWrapper wrapper">
          <BlogSidebar
            site={site}
            current={metadata}
            metadatas={recent}
          />
          <Container className="mainContainer documentContainer postContainer blogContainer">
            <div className="lonePost">
              <BlogPost site={site} post={metadata} />
              <SocialButtons site={site} post={metadata} />
            </div>
            <div className="blog-recent">
              <a className="button" href={site.config.baseUrl + 'blog'}>
                Recent Posts
              </a>
            </div>
          </Container>
        </div>
      </Page>
    );
  }
}

module.exports = BlogPostLayout;
