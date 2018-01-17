const React = require('react');

class Footer extends React.Component {
  render() {
    const { site } = this.props;
    const { theme } = site;
    const currentYear = new Date().getFullYear();
    return (
      <footer style={theme.footer}>
        <section style={theme.sitemap}>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapTitle}>Docs</h5>
            <a style={theme.sitemapRow} href={site.docUrl('guide_installation')}>Getting Started</a>
            <a style={theme.sitemapRow} href={site.docUrl('guide_color_scheme')}>Guides</a>
          </div>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapTitle}>Community</h5>
            <a style={theme.sitemapRow} href={site.pageUrl('users')}>User Showcase</a>
            <a
              style={theme.sitemapRow}
              href="https://twitter.com/"
              target="_blank">
              Twitter
            </a>
          </div>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapTitle}>More</h5>
            <a style={theme.sitemapRow} href={site.url('blog')}>Blog</a>
            <a style={theme.sitemapRow} href="https://github.com/richardzcode/Dochameleon">GitHub</a>
            <div style={theme.sitemapRow}>
              <a
                className="github-button"
                href="https://github.com/richardzcode/Dochameleon"
                data-icon="octicon-star"
                data-show-count="true"
                aria-label="Star richardzcode/Dochameleon on GitHub"
              >Star</a>
            </div>
          </div>
        </section>

        <section style={theme.copyrightSection}>
          <a style={theme.copyrightLink}  href="https://github.com/richardzcode/" target="_blank">
            {site.config.copyright}
          </a>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
