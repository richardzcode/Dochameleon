const React = require('react');

const async_script = '<script type="text/javascript" src="$src$" async ></script>';

class Head extends React.Component {
  render() {
    const { site, title, url, description, ogImage, redirect } = this.props;
    const { config } = site;

    const keywords = config.keywords || 'Open Source Documentation Dochameleon';
    const author = config.author || 'Dochameleon.io';
    let img_src = site.icon? site.urlWithRoot(site.icon) : '';
    if (config.ogImage) { img_src = site.urlWithRoot(config.ogImage); }
    if (ogImage) { img_src = site.urlWithRoot(ogImage); }

    return (
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="Dochameleon" />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        { img_src && <meta property="og:image" content={img_src} /> }
        {config.noIndex && <meta name="robots" content="noindex" />}
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
          config.js.map((source, idx) => {
            const src = (typeof source === 'string')? source : source.src;
            return source.async
              ? <span key={idx} dangerouslySetInnerHTML={{__html: async_script.replace('$src$', src)}} />
              : <script type="text/javascript" key={idx} src={src} />
          })
        }
      </head>
    );
  }
}

module.exports = Head;
