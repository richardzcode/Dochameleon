const React = require('react');
const { Row, Col } = require('fluid-react');

const Page = require('../Page.js');
const Button = require('../Button.js');
const Doc = require('./Doc.js');
const DocsSidebar = require('./DocsSidebar.js');

const PrevNext = props => {
  const { site, metadata, lang } = props;
  const { theme } = site;
  if (!metadata.previous && !metadata.next) { return null; }

  return (
    <div style={theme.prevnext}>
      {metadata.previous && (
        <Button site={site} href={site.docUrl(metadata.previous, lang)}>
          ←{' '}{site.i18n.translate(metadata.previous_title || 'Previous', lang)}
        </Button>
      )}
      &nbsp;
      {metadata.next && (
        <Button site={site} href={site.docUrl(metadata.next, lang)}>
          {site.i18n.translate(metadata.next_title || 'Next', lang)}{' '}→
        </Button>
      )}
    </div>
  )
}

class DocsLayout extends React.Component {
  render() {
    const { site, metadata, lang } = this.props;
    const { theme } = site;
    const { title, brief } = metadata;
    const content = this.props.children;
    const url = site.urlWithRoot(site.docUrl(metadata.id));

    return (
      <Page site={site} title={title} description={brief} url={url} lang={lang}>
        <Row>
          <Col xs={12} md={4} lg={3}>
            <DocsSidebar site={site} metadata={metadata} lang={lang} />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <Doc site={site} title={title} lang={lang}>{content}</Doc>
            <PrevNext site={site} metadata={metadata} lang={lang} />
          </Col>
        </Row>
      </Page>
    );
  }
}
module.exports = DocsLayout;
