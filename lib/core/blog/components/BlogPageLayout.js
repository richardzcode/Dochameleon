const React = require('react');

const Page = require('../../components/Page.js');
const Container = require('../../components/Container.js');
const BlogPost = require('./BlogPost.js');
const BlogSidebar = require('./BlogSidebar.js');

class BlogPageLayout extends React.Component {
  render() {
    const { site, metadatas, pageNumber, pageSize, previous, next } = this.props;
    const postComps = metadatas.map(post => {
      return (
        <BlogPost
          site={site}
          post={post}
          truncate={true}
          key={post.path + post.title}
        />
      );
    });
    return (
      <Page title="Blog" site={site}>
        <div className="docMainWrapper wrapper">
          <BlogSidebar site={site} metadatas={metadatas} />
          <Container className="mainContainer documentContainer postContainer blogContainer">
            <div className="posts">
              {postComps}
              <div className="docs-prevnext">
                {previous && <a className="docs-prev" href={previous}>← Prev</a>}
                {next && <a className="docs-next" href={next}>Next →</a>}
              </div>
            </div>
          </Container>
        </div>
      </Page>
    );
  }
}

module.exports = BlogPageLayout;
