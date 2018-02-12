const React = require('react');
const { H2, Div } = require('fluid-react');

const Button = require('./Button.js');

class HomeSplash extends React.Component {
  render() {
    const { site, lang } = this.props;
    const tagline = site.i18n.translate('tagline', lang, site.config.tagline);
    return (
      <Div style={site.theme.homeSplash}>
        <H2 style={site.theme.title}>
          {site.config.title}
          <Div style={site.theme.tagline}>{tagline}</Div>
        </H2>
        <Div style={site.theme.promoSection}>
          <Button site={site} lang={lang} href={site.docUrl('guide_installation')}>Getting Started</Button>
          <Button site={site} lang={lang} href={site.docUrl('guide_color_scheme')}>Customization</Button>
          <Button site={site} lang={lang} href="https://github.com/richardzcode/Dochameleon">GitHub</Button>
        </Div>
      </Div>
    );
  }
}

module.exports = HomeSplash;
