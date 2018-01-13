const React = require('react');

const MarkdownBlock = props => {
  const { site } = props;
  const html = site.parser.markdownToHtml(props.children);
  return <span dangerouslySetInnerHTML={{__html: html}} />
}

module.exports = MarkdownBlock;
