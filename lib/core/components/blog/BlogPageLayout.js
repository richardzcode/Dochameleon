const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../Page.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

class BlogPageLayout extends React.Component {
  render() {
    const { site, metadatas, pageNumber, pageSize, previous, next } = this.props;
    const { theme } = site;
    const postComps = metadatas.map(post => {
      return <BlogPost site={site} post={post} truncate={true} key={post.path + post.title} />
    });
    return (
      <Page title="Blog" site={site}>
        <Row>
          <Col xs={0} md={4} lg={3}>
            <BlogSidebar site={site} metadatas={metadatas} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            {postComps}
            <div style={theme.prevnext}>
              {previous && <a href={previous}>← Prev</a>}
              &nbsp;
              {next && <a href={next}>Next →</a>}
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

module.exports = BlogPageLayout;
