const React = require('react');

const MarkdownBlock = require('../../components/MarkdownBlock.js');

class Doc extends React.Component {
  render() {
    const { site, title } = this.props;
    const { theme } = site;

    return (
      <div style={theme.section}>
        <header>
          <h2 style={theme.title}>{title}</h2>
        </header>
        <article>
          <MarkdownBlock site={site}>{this.props.children}</MarkdownBlock>
        </article>
      </div>
    );
  }
}

module.exports = Doc;
