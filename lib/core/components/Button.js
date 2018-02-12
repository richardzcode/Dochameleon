const React = require('react');

class Button extends React.Component {
  render() {
    const { site, lang, style, href, target } = this.props;
    const theme = site.theme;
    const buttonStyle = Object.assign({}, theme.button, style);
    return (
      <a style={buttonStyle} href={href} target={target}>
        {site.i18n.renderElement(this.props.children, lang)}
      </a>
    )
  }
}

Button.defaultProps = {
  target: '_self',
};

module.exports = Button;
