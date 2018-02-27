const React = require('react');

class Footer extends React.Component {
  render() {
    const { site, lang } = this.props;
    const { theme } = site;
    const currentYear = new Date().getFullYear();
    return (
      <footer style={theme.footer}>
        <section style={theme.sitemap}>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapTitle}>{site.i18n.translate('Docs', lang)}</h5>
            <a style={theme.sitemapRow} href={site.docUrl('guide_installation', lang)}>
              {site.i18n.translate('Getting Started', lang)}
            </a>
            <a style={theme.sitemapRow} href={site.docUrl('guide_progressive', lang)}>
              {site.i18n.translate('Customize', lang)}
            </a>
            <a style={theme.sitemapRow} href={site.docUrl('guide_search', lang)}>
              {site.i18n.translate('Advanced', lang)}
            </a>
          </div>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapTitle}>{site.i18n.translate('Community', lang)}</h5>
            <a style={theme.sitemapRow} href={site.pageUrl('users', lang)}>
              {site.i18n.translate('User Showcase', lang)}
            </a>
            <a
              style={theme.sitemapRow}
              href="https://gitter.im/Dochameleon/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link"
              target="_blank">
              {site.i18n.translate('Gitter', lang)}
            </a>
          </div>
          <div style={theme.sitemapSection}>
            <h5 style={theme.sitemapTitle}>{site.i18n.translate('More', lang)}</h5>
            <a style={theme.sitemapRow} href={site.url('blog/', lang)}>
              {site.i18n.translate('Blog', lang)}
            </a>
            <a style={theme.sitemapRow} href="https://github.com/richardzcode/Dochameleon">
              {site.i18n.translate('GitHub', lang)}
            </a>
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
