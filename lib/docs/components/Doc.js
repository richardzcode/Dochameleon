const React = require('react');

const MarkdownBlock = require('../../core/MarkdownBlock.js');

class Doc extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div className="post">
        <header className="postHeader">
          <h1>{title}</h1>
        </header>
        <article>
          <MarkdownBlock>{this.props.children}</MarkdownBlock>
        </article>
      </div>
    );
  }
}

module.exports = Doc;
