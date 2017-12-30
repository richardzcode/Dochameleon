const React = require('react');
const Remarkable = require('./Remarkable');

class MarkdownBlock extends React.Component {
  render() {
    return <Remarkable source={this.props.children} />;
  }
}

module.exports = MarkdownBlock;
