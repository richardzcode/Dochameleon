const React = require('react');
const { Div } = require('fluid-react');
const { JS } = require('fsts');

const Head = require('./Head.js');
const HeaderNav = require('./HeaderNav.js');
const Footer = require('./Footer.js');
const AnalyticsScript = require('./AnalyticsScript.js');

class Page extends React.Component {
  render() {
    const { site, lang, title } = this.props;
    const { config, theme } = site;

    const tagline = site.i18n.translate(config.tagline, lang);
    const configTitle = site.i18n.translate(config.title, lang);
    const pageTitle = title
      ? [site.i18n.translate(title), configTitle].join(' . ')
      : [configTitle, tagline].join(' . ');
    const description = this.props.description || tagline;
    const url = this.props.url || site.url('index.html');

    let resetCss = '';
    if (theme.reset) {
      resetCss = Object.keys(theme.reset)
        .map(key => key + JS.styleToCss(theme.reset[key]))
        .join('');
    }

    const render_children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { lang: lang });
    });

    return (
      <html style={theme.html}>
        <Head site={site} title={pageTitle} description={description} url={url} />
        <AnalyticsScript site={site} />
        <body style={theme.body}>
          <style dangerouslySetInnerHTML={{__html: resetCss}}></style>
          { !config.noHeaderNav && <HeaderNav site={site} lang={lang} /> }
          <Div style={config.noHeaderNav? theme.mainNoHeaderNav : theme.main}>
            {render_children}
          </Div>
          <Footer site={site} lang={lang} />
        </body>
      </html>
    );
  }
}

module.exports = Page;
