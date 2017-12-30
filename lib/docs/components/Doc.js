const React = require('react');

const MarkdownBlock = require('../../core/MarkdownBlock.js');

const editThisDoc = 'Edit this Doc|recruitment message asking to edit the doc source';

// inner doc component for article itself
class Doc extends React.Component {
  render() {
    const { current, content, config } = this.props;
    const { source, title } = current;
    let docSource = this.props.source;

    let editLink = config.editUrl && (
      <a
        className="edit-page-link button"
        href={config.editUrl + source}
        target="_blank">
        {editThisDoc}
      </a>
    );

    return (
      <div className="post">
        <header className="postHeader">
          {editLink}
          <h1>{title}</h1>
        </header>
        <article>
          <MarkdownBlock>{content}</MarkdownBlock>
        </article>
      </div>
    );
  }
}

module.exports = Doc;
