const React = require('react');
const fs = require('fs');

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.mapLink = this.mapLink.bind(this);
  }

  mapLink(link) {
    const { site } = this.props;
    if (link.search && site.config.algolia) {
      // return algolia search bar
      return (
        <li className="navSearchWrapper reactNavSearchWrapper" key="search">
          <input id="search_input_react" type="text" placeholder="Search" />
        </li>
      );
    }

    return (
      <li key={link.label + 'page'}>
        <a href={link.href} target={link.external ? '_blank' : '_self'}>
          {link.label}
        </a>
      </li>
    );
  }

  render() {
    const { site } = this.props;
    return (
      <div className="fixedHeaderContainer">
        <div className="headerWrapper wrapper">
          <header>
            <a href={site.config.baseUrl}>
              {site.config.headerIcon && (
                <img
                  className="logo"
                  src={site.config.baseUrl + site.config.headerIcon}
                />
              )}
              {!site.config.disableHeaderTitle && (
                <h2 className="headerTitle">{this.props.title}</h2>
              )}
            </a>
            {this.renderResponsiveNav()}
          </header>
        </div>
      </div>
    );
  }

  renderResponsiveNav() {
    const { site } = this.props;
    const headerLinks = site.headerLinks;
    const hasSearch = site.headerLinks.filter(link => !!link.search).length > 0;
    if (!hasSearch && site.config.algolia) {
      headerLinks.push({search: true});
    }
    return (
      <div className="navigationWrapper navigationSlider">
        <nav className="slidingNav">
          <ul className="nav-site nav-site-internal">
            {headerLinks.map(this.mapLink, this)}
          </ul>
        </nav>
      </div>
    );
  }
}

module.exports = HeaderNav;
