const React = require('react');

class Button extends React.Component {
  render() {
    const { site, style, href, target } = this.props;
    const theme = site.theme;
    const buttonStyle = Object.assign({}, theme.button, style);
    return (
      <a style={buttonStyle} href={href} target={target}>
        {this.props.children}
      </a>
    )
  }
}

Button.defaultProps = {
  target: '_self',
};

module.exports = Button;
