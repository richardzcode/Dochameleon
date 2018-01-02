const fs = require('fs');
const React = require('react');
const HeaderNav = require('./nav/HeaderNav.js');
const Head = require('./Head.js');
const Footer = require(process.cwd() + '/core/Footer.js');

const CWD = process.cwd();

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
    const url = site.config.rootUrl + (this.props.url || 'index.html');

    return (
      <html>
        <Head
          site={site}
          title={title}
          description={description}
          url={url}
        />
        <body className={this.props.className}>
          <HeaderNav
            site={site}
            baseUrl={site.config.baseUrl}
            title={site.config.title}
          />
          <div className="navPusher">
            {this.props.children}
            <Footer site={site} />
          </div>
        </body>
      </html>
    );
  }
}
module.exports = Page;
