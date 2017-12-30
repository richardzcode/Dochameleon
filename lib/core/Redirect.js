const React = require('react');
const Head = require('./Head.js');

// Component used to provide same head, header, footer, other scripts to all pages
class Redirect extends React.Component {
  render() {
    const { config } = this.props;
    const tagline = config.tagline;
    const title = this.props.title
      ? this.props.title + ' · ' + config.title
      : config.title + (config.disableTitleTagline ? '' : ' . ' + tagline);
    const description = this.props.description || tagline;
    const url = config.url + config.baseUrl + (this.props.url || 'index.html');
    const redirect = this.props.redirect || false;

    return (
      <html>
        <Head
          config={config}
          description={description}
          title={title}
          url={url}
          redirect={redirect}
        />
        <body className={this.props.className}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                <!--
                window.location.href = "${this.props.redirect}";
                // -->
                `,
            }}
          />
        </body>
      </html>
    );
  }
}
module.exports = Redirect;
