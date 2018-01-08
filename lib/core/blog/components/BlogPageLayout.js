const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../../components/Page.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

class BlogPageLayout extends React.Component {
  render() {
    const { site, metadatas, pageNumber, pageSize, previous, next } = this.props;
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
            <div>
              {previous && <a className="docs-prev" href={previous}>← Prev</a>}
              {next && <a className="docs-next" href={next}>Next →</a>}
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

module.exports = BlogPageLayout;
