const React = require('react');

const Page = require('../../core/Page.js');
const Container = require('../../core/Container.js');
const Doc = require('./Doc.js');
const DocsSidebar = require('./DocsSidebar.js');

class DocsLayout extends React.Component {
  render() {
    const { site, metadata, docs } = this.props;
    const content = this.props.children;

    return (
      <Page
        site={site}
        className="sideNavVisible"
        title={metadata.title}
        description={content.trim().split('\n')[0]}
      >
        <div className="docMainWrapper wrapper">
          <DocsSidebar
            site={site}
            metadata={metadata}
            docs={docs}
          />
          <Container className="mainContainer">
            <Doc title={metadata.title}>
              {content}
            </Doc>
            <div className="docs-prevnext">
              {metadata.previous && (
                <a
                  className="docs-prev button"
                  href={metadata.previous + '.html'}>
                  ←{' '}{metadata.previous_title || 'Previous'}
                </a>
              )}
              {metadata.next && (
                <a
                  className="docs-next button"
                  href={metadata.next + '.html'}>
                  {metadata.next_title || 'Next'}{' '}→
                </a>
              )}
            </div>
          </Container>
        </div>
      </Page>
    );
  }
}
module.exports = DocsLayout;
