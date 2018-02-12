const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../Page.js');
const Button = require('../Button.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

class BlogPostLayout extends React.Component {
  render() {
    const { site, post, recent, lang } = this.props;
    const { theme } = site;
    const url = site.urlWithRoot(site.blogUrl(post.path, lang));
    return (
      <Page site={site} title={post.title} description={post.brief} url={url} lang={lang}>
        <Row>
          <Col xs={0} md={4} lg={3}>
            <BlogSidebar site={site} current={post} metadatas={recent} lang={lang} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <BlogPost site={site} post={post} lang={lang} />
            <div style={theme.prevnext}>
              &nbsp;
              <Button site={site} href={site.url('blog', lang)}>
                {site.i18n.translate('Recent Posts', lang)}
              </Button>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

module.exports = BlogPostLayout;
