const React = require('react');

class Footer extends React.Component {
  render() {
    const theme = this.props.site.theme;
    const currentYear = new Date().getFullYear();
    return (
      <footer style={theme.footer}>
        <section style={theme.copyrightSection}>
          <a style={theme.copyrightLink}  href="https://github.com/richardzcode/" target="_blank">
            Copyright &copy; {currentYear} Richard Zhang
          </a>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
