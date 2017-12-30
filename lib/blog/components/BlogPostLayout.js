const React = require('react');

const Page = require('../../core/Page.js');
const Container = require('../../core/Container.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

// used for entire blog posts, i.e., each written blog article with sidebar with site header/footer
class BlogPostLayout extends React.Component {
  renderSocialButtons() {
    const { metadata, site } = this.props;

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
        data-text={metadata.title}
        data-url={site.config.url + site.config.baseUrl + 'blog/' + post.path}
        data-related={site.config.twitter}
        data-via={metadata.authorTwitter}
        data-show-count="false">
        Tweet
      </a>
    ) : null;

    if (!fbLike && !twitterShare) {
      return;
    }

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

  getDescription() {
    const { metadata } = this.props;
    var descLines = metadata.content.trim().split('\n');
    for (var i = 0; i < descLines.length; i++) {
      // Don't want blank lines or descriptions that are raw image rendering strings
      if (descLines[i] && !descLines[i].startsWith('![')) {
        return descLines[i];
      }
    }
    return null;
  }

  render() {
    const { metadata, recent, site } = this.props;
    return (
      <Page
        className="sideNavVisible"
        url={'blog/' + metadata.path}
        title={metadata.title}
        description={this.getDescription()}
        site={site}>
        <div className="docMainWrapper wrapper">
          <BlogSidebar
            current={metadata}
            metadatas={recent}
            site={site}
          />
          <Container className="mainContainer documentContainer postContainer blogContainer">
            <div className="lonePost">
              <BlogPost
                post={metadata}
                site={site}
              />
              {this.renderSocialButtons()}
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
