const React = require('react');

const MarkdownBlock = props => {
  const { site, lang } = props;
  const html = site.parser.markdownToHtml(props.children, lang);
  return <span dangerouslySetInnerHTML={{__html: html}} />
}

module.exports = MarkdownBlock;
