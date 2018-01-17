const React = require('react');

class Head extends React.Component {
  render() {
    const { site, title, url, description, redirect } = this.props;
    const { config } = site;

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
        {config.noIndex && <meta name="robots" content="noindex" />}
        {config.ogImage && (
          <meta property="og:image" content={site.url(config.ogImage)} />
        )}
        {redirect && (
          <meta http-equiv="refresh" content={'0; URL=' + redirect} />
        )}
        <link rel="shortcut icon" href={site.favicon} />
        {!site.blog.isEmpty() && (
          <link
            rel="alternate"
            type="application/atom+xml"
            href={site.url('/blog/atom.xml')}
            title={config.title + ' Blog ATOM Feed'}
          />
        )}
        {!site.blog.isEmpty() && (
          <link
            rel="alternate"
            type="application/rss+xml"
            href={site.url('/blog/feed.xml')}
            title={config.title + ' Blog RSS Feed'}
          />
        )}

        {
          config.css &&
          config.css.map((source, idx) => (
            <link key={'css' + idx} rel="stylesheet" href={source} />
          ))
        }
        {
          config.js &&
          config.js.map((source, idx) => (
            <script type="text/javascript" key={'script' + idx} src={source} />
          ))
        }
      </head>
    );
  }
}

module.exports = Head;
