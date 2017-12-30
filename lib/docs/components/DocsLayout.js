const React = require('react');

const Page = require('../../core/Page.js');
const Container = require('../../core/Container.js');
const Doc = require('./Doc.js');
const DocsSidebar = require('./DocsSidebar.js');

// component used to generate whole webpage for docs, including sidebar/header/footer
class DocsLayout extends React.Component {
  render() {
    const { site, current, metadatas, sidebars } = this.props;
    const content = this.props.children;
    let DocComponent = this.props.Doc || Doc;

    return (
      <Page
        site={site}
        className="sideNavVisible"
        title={current.title}
        description={content.trim().split('\n')[0]}
      >
        <div className="docMainWrapper wrapper">
          <DocsSidebar
            current={current}
            metadatas={metadatas}
            sidebars={sidebars}
            site={site}
          />
          <Container className="mainContainer">
            <DocComponent
              current={current}
              content={content}
              config={site.config}
            />
            <div className="docs-prevnext">
              {current.previous && (
                <a
                  className="docs-prev button"
                  href={current.previous + '.html'}>
                  ←{' '}{current.previous_title || 'Previous'}
                </a>
              )}
              {current.next && (
                <a
                  className="docs-next button"
                  href={current.next + '.html'}>
                  {current.next_title || 'Next'}{' '}→
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
