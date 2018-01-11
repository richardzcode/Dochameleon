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
            <h5 style={theme.sitemapSectionTitle}>Docs</h5>
            <a style={theme.sitemapSectionRow} href={site.docUrl('doc1')}>Getting Started</a>
            <a style={theme.sitemapSectionRow} href={site.docUrl('doc2')}>Guides</a>
            <a style={theme.sitemapSectionRow} href={site.docUrl('doc3')}>API Reference</a>
          </div>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapSectionTitle}>Community</h5>
            <a style={theme.sitemapSectionRow} href={site.pageUrl('users')}>User Showcase</a>
            <a
              style={theme.sitemapSectionRow}
              href="http://stackoverflow.com/questions/tagged/"
              target="_blank">
              Stack Overflow
            </a>
            <a
              style={theme.sitemapSectionRow}
              href="https://twitter.com/"
              target="_blank">
              Twitter
            </a>
          </div>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapSectionTitle}>More</h5>
            <a style={theme.sitemapSectionRow} href={site.url('blog')}>Blog</a>
            <a style={theme.sitemapSectionRow} href="https://github.com/richardzcode/Dochameleon">GitHub</a>
            <a
              style={theme.sitemapSectionRow}
              className="github-button"
              href="https://github.com/richardzcode/Dochameleon"
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
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
