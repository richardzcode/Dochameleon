const React = require('react');
const { H2, Div } = require('fluid-react');

const Button = require('./Button.js');

class HomeSplash extends React.Component {
  render() {
    const { site } = this.props;
    return (
      <Div style={site.theme.homeSplash}>
        <H2 style={site.theme.title}>
          {site.config.title}
          <Div style={site.theme.tagline}>{site.config.tagline}</Div>
        </H2>
        <Div style={site.theme.promoSection}>
          <Button site={site} href={site.docUrl('guide_installation')}>Getting Started</Button>
          <Button site={site} href={site.docUrl('guide_color_schema')}>Customization</Button>
          <Button site={site} href={site.docUrl('doc1')}>Example Link</Button>
        </Div>
      </Div>
    );
  }
}

module.exports = HomeSplash;
