const React = require('react');

class Footer extends React.Component {
  render() {
    const { site } = this.props;
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <a
          href="https://code.facebook.com/projects/"
          target="_blank"
          className="fbOpenSource">
          <img
            src={site.config.baseUrl + 'img/oss_logo.png'}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} Facebook Inc.
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
