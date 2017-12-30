const React = require('react');
const fs = require('fs');
const HeaderNav = require('./nav/HeaderNav.js');
const Head = require('./Head.js');
const Footer = require(process.cwd() + '/core/Footer.js');

const CWD = process.cwd();

// Component used to provide same head, header, footer, other scripts to all pages
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
          description={description}
          title={title}
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
          {site.config.algolia && (
            <script
              type="text/javascript"
              src="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"
            />
          )}
          {site.config.algolia &&
            (site.config.algolia.algoliaOptions ? (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              var search = docsearch({
                apiKey: '${site.config.algolia.apiKey}',
                indexName: '${site.config.algolia.indexName}',
                inputSelector: '#search_input_react',
                algoliaOptions: ${JSON.stringify(
                  site.config.algolia.algoliaOptions
                )}
              });
            `,
                }}
              />
            ) : (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              var search = docsearch({
                apiKey: '${site.config.algolia.apiKey}',
                indexName: '${site.config.algolia.indexName}',
                inputSelector: '#search_input_react'
              });
            `,
                }}
              />
            ))}
        </body>
      </html>
    );
  }
}
module.exports = Page;
