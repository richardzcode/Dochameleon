const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../Page.js');
const Button = require('../Button.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

class BlogPostLayout extends React.Component {
  render() {
    const { site, metadata, recent } = this.props;
    const { theme } = site;
    const url = site.url('blog' + metadata.path);
    return (
      <Page site={site} title={metadata.title} description={metadata.brief} url={url}>
        <Row>
          <Col xs={0} md={4} lg={3}>
            <BlogSidebar site={site} current={metadata} metadatas={recent} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <BlogPost site={site} post={metadata} />
            <div style={theme.prevnext}>
              &nbsp;
              <Button style={theme.button} site={site} href={site.config.baseUrl + 'blog'}>
                Recent Posts
              </Button>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

module.exports = BlogPostLayout;
