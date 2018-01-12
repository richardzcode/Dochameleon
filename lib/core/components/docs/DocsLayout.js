const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../Page.js');
const Button = require('../Button.js');
const Doc = require('./Doc.js');
const DocsSidebar = require('./DocsSidebar.js');

const PrevNext = props => {
  const { site, metadata } = props;
  const { theme } = site;
  if (!metadata.previous && !metadata.next) { return null; }

  return (
    <div style={theme.prevnext}>
      {metadata.previous && (
        <Button site={site} href={site.docUrl(metadata.previous)}>
          ←{' '}{metadata.previous_title || 'Previous'}
        </Button>
      )}
      &nbsp;
      {metadata.next && (
        <Button site={site} href={site.docUrl(metadata.next)}>
          {metadata.next_title || 'Next'}{' '}→
        </Button>
      )}
    </div>
  )
}

class DocsLayout extends React.Component {
  render() {
    const { site, metadata } = this.props;
    const { theme } = site;
    const { title } = metadata;
    const content = this.props.children;

    return (
      <Page site={site} title={title} description={content.trim().split('\n')[0]}>
        <Row>
          <Col xs={12} md={4} lg={3}>
            <DocsSidebar site={site} metadata={metadata} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <Doc site={site} title={title}>{content}</Doc>
            <PrevNext site={site} metadata={metadata} />
          </Col>
        </Row>
      </Page>
    );
  }
}
module.exports = DocsLayout;
