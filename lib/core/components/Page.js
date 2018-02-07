const React = require('react');
const { Div } = require('fluid-react');
const { JS } = require('fsts');

const Head = require('./Head.js');
const HeaderNav = require('./HeaderNav.js');
const Footer = require('./Footer.js');
const AnalyticsScript = require('./AnalyticsScript.js');

class Page extends React.Component {
  render() {
    const { site } = this.props;
    const { config, theme } = site;

    const tagline = config.tagline;
    const title = this.props.title
      ? this.props.title + ' · ' + config.title
      : (!config.disableTitleTagline && config.title + ' · ' + tagline) || config.title;
    const description = this.props.description || tagline;
    const url = this.props.url || site.url('index.html');

    let resetCss = '';
    if (theme.reset) {
      resetCss = Object.keys(theme.reset)
        .map(key => key + JS.styleToCss(theme.reset[key]))
        .join('');
    }

    return (
      <html style={theme.html}>
        <Head site={site} title={title} description={description} url={url} />
        <AnalyticsScript site={site} />
        <body style={theme.body}>
          <style dangerouslySetInnerHTML={{__html: resetCss}}></style>
          { !config.noHeaderNav && <HeaderNav site={site} title={config.title} /> }
          <Div style={config.noHeaderNav? theme.mainNoHeaderNav : theme.main}>
            {this.props.children}
          </Div>
          <Footer site={site} />
        </body>
      </html>
    );
  }
}

module.exports = Page;
