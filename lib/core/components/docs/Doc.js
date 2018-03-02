const React = require('react');

const MarkdownBlock = require('../MarkdownBlock.js');

class Doc extends React.Component {
  render() {
    const { site, lang, title } = this.props;
    const { theme } = site;

    return (
      <div style={theme.section}>
        { title && (
            <header style={theme.sectionHeader}>
              <h2 style={theme.title}>{site.i18n.translate(title, lang)}</h2>
            </header>
          )
        }
        <article>
          <MarkdownBlock site={site} lang={lang}>{this.props.children}</MarkdownBlock>
        </article>
      </div>
    );
  }
}

module.exports = Doc;
