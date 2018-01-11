const React = require('react');
const { Div } = require('fluid-react');
const { JS } = require('fsts');

const Head = require('./Head.js');
const HeaderNav = require('./HeaderNav.js');
const Footer = require('./Footer.js');

class Page extends React.Component {
  render() {
    const { site } = this.props;
    const tagline = site.config.tagline;
    const title = this.props.title
      ? this.props.title + ' · ' + site.config.title
      : (!site.config.disableTitleTagline &&
          site.config.title + ' · ' + tagline) ||
        site.config.title;
    const description = this.props.description || tagline;
    const url = this.props.url || site.url('index.html');

    const { theme } = site;
    let resetCss = '';
    if (theme.reset) {
      resetCss = Object.keys(theme.reset)
        .map(key => key + JS.styleToCss(theme.reset[key]))
        .join('');
    }

    return (
      <html style={theme.html}>
        <Head site={site} title={title} description={description} url={url} />
        <body style={theme.body}>
          <style dangerouslySetInnerHTML={{__html: resetCss}}></style>
          <HeaderNav site={site} title={site.config.title} />
          <Div style={theme.main}>
            {this.props.children}
          </Div>
          <Footer site={site} />
        </body>
      </html>
    );
  }
}

module.exports = Page;
