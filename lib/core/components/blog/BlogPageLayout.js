const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../Page.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

class BlogPageLayout extends React.Component {
  render() {
    const { site, posts, previous, next, lang } = this.props;
    const { theme } = site;
    const postComps = posts.map(post => (
      <BlogPost
        site={site}
        post={post}
        truncate={true}
        key={post.path + post.title}
        lang={lang}
      />
    ));
    return (
      <Page title="Blog" site={site} lang={lang}>
        <Row>
          <Col xs={0} md={4} lg={3}>
            <BlogSidebar site={site} metadatas={posts} lang={lang} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            {postComps}
            <div style={theme.prevnext}>
              {previous && <a href={previous}>← {site.i18n.translate('Prev', lang)}</a>}
              &nbsp;
              {next && <a href={next}>{site.i18n.translate('Next', lang)} →</a>}
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

module.exports = BlogPageLayout;
