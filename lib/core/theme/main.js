const color = require('./color.js');

const MainTheme = {
  html: {
    fontFamily: `-apple-system,
      system-ui,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      Arial,
      sans-serif`,
    background: '#f9f9f9',
    color: color.content
  },
  body: {
    margin: '0',
    padding: '0',
    border: '0',
    fontSize: '16px',
    height: '100vh'
  },

  h1: {
    textAlign: 'center',
    color: color.primary,
    fontWeight: 300,
    fontSize: '400%',
    lineHeight: '1.2em',
    margin: '0'
  },
  h2: {
    textAlign: 'center',
    color: color.primary,
    fontWeight: 300,
    fontSize: '300%',
    lineHeight: '1.2em',
    margin: '0'
  },
  h3: {
    textAlign: 'center',
    color: color.primary,
    fontWeight: 300,
    fontSize: '200%',
    lineHeight: '1.2em',
    margin: '0'
  },
  h4: {
    textAlign: 'center',
    color: color.content,
    fontWeight: 300,
    fontSize: '150%',
    lineHeight: '1.2em',
    margin: '0'
  },
  h5: {
    textAlign: 'center',
    color: color.content,
    fontWeight: 300,
    fontSize: '120%',
    lineHeight: '1.2em',
    margin: '0'
  },
  h6: {
    textAlign: 'center',
    color: color.contentSecondary,
    fontWeight: 300,
    fontSize: '100%',
    lineHeight: '1.2em',
    margin: '0'
  },
  p: {
    lineHeight: '1.5em',
    color: color.content,
    paddingTop: '10px',
    margin: '0'
  },

  main: {
    paddingTop: '100px',
    paddingBottom: '0',
    background: '#f9f9f9',
    fontSize: '16px',
    '@media (min-width: 768px)': {
      paddingTop: '50px'
    }
  },
  section: {
    padding: '20px'
  },

  nav: {
    boxSizing: 'border-box',
    background: color.nav.primary,
    width: '100%',
    minHeight: '50px',
    verticalAlign: 'middle',
    position: 'fixed',
    zIndex: '9999'
  },
  navTitle: {
    display: 'flex',
    padding: '10px 20px',
    textDecoration: 'none'
  },
  navLogo: {
    width: '30px',
    height: '30px',
    borderRadius: '50%'
  },
  navTitleTitle: {
    color: color.nav.font,
    fontSize: '20px',
    fontWeight: '300',
    marginTop: '5px',
    marginLeft: '5px'
  },
  navItemsOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  navItems: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '0',
    paddingRight: '10px',
    background: 'none',
    listStyleType: 'none',
    verticalAlign: 'middle',
    justifyContent: 'flex-end',
    '@media (max-width: 767px)': {
      background: color.nav.secondary,
      paddingTop: '10px',
      paddingBottom: '10px'
    }
  },
  navItem: {
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    padding: '0 10px',
    margin: '0',
    '@media (max-width: 767px)': {
      flexGrow: '1'
    }
  },
  navItemLink: {
    color: color.nav.fontSecondary,
    textDecoration: 'none',
    verticalAlign: 'middle'
  },
  navItemImage: {
    height: '1.2em',
    verticalAlign: 'middle'
  },

  sideNav: {
    padding: '10px 20px'
  },
  sideNavCategory: {
    background: '#e0e0e0',
    lineHeight: '1.5em',
    wordWrap: 'break-word',
    margin: '0'
  },
  sideNavCategoryCap: {
    fontSize: '1.2em',
    fontWeight: '300',
    lineHeight: '1.5em',
    padding: '10px',
    background: color.nav.primary,
    color: color.nav.font
  },
  sideNavItems: {
    padding: '10px',
    listStyle: 'none',
    margin: '0'
  },
  sideNavItem: {
    listStyleType: 'none',
    margin: '0',
    padding: '5px 0'
  },
  sideNavItemLink: {
    border: 'none',
    color: color.content,
    margin: '0',
    padding: '5px 0',
    textDecoration: 'none'
  },
  sideNavItemLinkActive: {
    color: color.clickable
  },

  breadcrumb: {
    paddingLeft: '20px',
    paddingTop: '5px',
    color: color.primary,
    fontSize: '0.8em'
  },

  footer: {
    position: 'relative',
    boxSizing: 'border-box',
    border: 'none',
    fontWeight: '400',
    color: '#202020',
    fontSize: '15px',
    lineHeight: '1.5em',
    background: color.footer,
    boxShadow: 'inset 0 10px 10px -5px rgba(0,0,0,0.2)',
    padding: '2em 0'
  },
  sitemap: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '3em'
  },
  sitemapSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  sitemapTitle: {
    fontWeight: '300',
    color: color.nav.font
  },
  sitemapRow: {
    marginTop: '10px',
    fontWeight: '300',
    color: color.nav.fontTertiary
  },
  copyrightSection: {
    textAlign: 'center'
  },
  copyrightLink: {
    fontWeight: '300',
    color: color.nav.fontTertiary
  },

  title: {
    color: color.title,
    fontWeight: 400,
    fontSize: '300%',
    lineHeight: '1em',
    margin: '0'
  },
  titleLink: {
    color: color.title
  },
  tagline: {
    fontWeight: 300,
    fontSize: '50%'
  },

  button: {
    margin: '4px',
    border: '1px solid ' + color.clickable,
    borderRadius: '3px',
    color: color.clickable,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.2em',
    padding: '10px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background 0.3s, color 0.3s'
  },

  prevnext: {
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  }
}

module.exports = MainTheme;
