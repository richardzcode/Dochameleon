const React = require('react');

class Head extends React.Component {
  render() {
    const { site, title, url, description, redirect } = this.props;
    const blog_links = site.config.headerLinks
      .filter(link => !!link.blog);
    let hasBlog = blog_links.length > 0;

    const highlightDefaultVersion = '9.12.0';
    const highlightConfig = site.config.highlight || {
      version: highlightDefaultVersion,
      theme: 'default',
    };
    const highlightVersion = highlightConfig.version || highlightDefaultVersion;
    const highlightTheme = highlightConfig.theme || 'default';

    return (
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="Docusaurus" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        {site.config.noIndex && <meta name="robots" content="noindex" />}
        {site.config.ogImage && (
          <meta
            property="og:image"
            content={site.rootUrl + site.config.ogImage}
          />
        )}
        {redirect && (
          <meta http-equiv="refresh" content={'0; URL=' + redirect} />
        )}
        <link
          rel="shortcut icon"
          href={site.config.baseUrl + site.config.favicon}
        />
        <link
          rel="stylesheet"
          href={`//cdnjs.cloudflare.com/ajax/libs/highlight.js/${highlightVersion}/styles/${highlightTheme}.min.css`}
        />
        {hasBlog && (
          <link
            rel="alternate"
            type="application/atom+xml"
            href={site.config.url + '/blog/atom.xml'}
            title={site.config.title + ' Blog ATOM Feed'}
          />
        )}
        {hasBlog && (
          <link
            rel="alternate"
            type="application/rss+xml"
            href={site.config.url + '/blog/feed.xml'}
            title={site.config.title + ' Blog RSS Feed'}
          />
        )}

        {/* External resources */}
        {site.config.stylesheets &&
          site.config.stylesheets.map(function(source) {
            return <link rel="stylesheet" href={source} />;
          })}
        {site.config.scripts &&
          site.config.scripts.map(function(source, idx) {
            return (
              <script
                type="text/javascript"
                key={'script' + idx}
                src={source}
              />
            );
          })}

        {/* Site defined code. Keep these at the end to avoid overriding. */}
        <link
          rel="stylesheet"
          href={site.config.baseUrl + 'css/main.css'}
        />
      </head>
    );
  }
}

module.exports = Head;
