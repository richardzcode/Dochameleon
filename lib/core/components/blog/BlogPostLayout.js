const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../Page.js');
const Button = require('../Button.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

class BlogPostLayout extends React.Component {
  render() {
    const { site, post, recent } = this.props;
    const { theme } = site;
    const url = site.urlWithRoot(site.blogUrl(post.path));
    return (
      <Page site={site} title={post.title} description={post.brief} url={url}>
        <Row>
          <Col xs={0} md={4} lg={3}>
            <BlogSidebar site={site} current={post} metadatas={recent} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <BlogPost site={site} post={post} />
            <div style={theme.prevnext}>
              &nbsp;
              <Button style={theme.button} site={site} href={site.url('blog')}>
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
