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
    color: '#393939'
  },
  body: {
    margin: '0',
    padding: '0',
    border: '0',
    fontSize: '16px'
  },

  h1: {
    textAlign: 'center',
    color: '#2E8555',
    fontWeight: 300,
    fontSize: '400%',
    lineHeight: '1.2em'
  },
  h2: {
    textAlign: 'center',
    color: '#2E8555',
    fontWeight: 300,
    fontSize: '300%',
    lineHeight: '1.2em'
  },
  h3: {
    textAlign: 'center',
    color: '#2E8555',
    fontWeight: 300,
    fontSize: '200%',
    lineHeight: '1.2em'
  },
  h4: {
    textAlign: 'center',
    color: '#393939',
    fontWeight: 300,
    fontSize: '150%',
    lineHeight: '1.2em'
  },
  h5: {
    textAlign: 'center',
    color: '#393939',
    fontWeight: 300,
    fontSize: '120%',
    lineHeight: '1.2em'
  },
  h6: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 300,
    fontSize: '100%',
    lineHeight: '1.2em'
  },
  p: {
    lineHeight: '1.5em',
    color: '#393939',
    paddingTop: '10px'
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
    background: '#2E8555',
    color: '#fff',
    width: '100%',
    maxWidth: '1100px',
    minHeight: '50px',
    verticalAlign: 'middle',
    position: 'fixed',
    zIndex: '9999'
  },
  navTitle: {
    display: 'flex',
    padding: '10px 20px'
  },
  navLogo: {
    width: '30px',
    height: '30px'
  },
  navTitleTitle: {
    color: '#fff',
    fontSize: '1.2em',
    fontWeight: '300'
  },
  navItems: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '0',
    padding: '10px 20px',
    background: 'none',
    verticalAlign: 'middle',
    justifyContent: 'flex-end',
    '@media (max-width: 767px)': {
      background: '#205C3B'
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
    color: 'rgba(255, 255, 255, 0.8)',
    verticalAlign: 'middle'
  },

  sideNav: {
    padding: '20px 10px'
  },
  sideNavCategory: {
    background: '#e0e0e0',
    lineHeight: '1.5em',
    wordWrap: 'break-word'
  },
  sideNavCategoryCap: {
    fontSize: '1.2em',
    lineHeight: '1.5em',
    padding: '10px',
    background: '#2E8555',
    color: '#fff'
  },
  sideNavItems: {
    padding: '10px',
    listStyle: 'none'
  },
  sideNavItem: {
    listStyleType: 'none',
    margin: '0',
    padding: '5px 0'
  },
  sideNavItemLink: {
    border: 'none',
    color: '#393939',
    margin: '0',
    padding: '5px 0',
    textDecoration: 'none'
  },
  sideNavItemLinkActive: {
    color: '#2E8555'
  },

  breadcrumb: {
    paddingLeft: '30px',
    color: '#2E8555',
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
    background: '#808080',
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
  sitemapSectionTitle: {
    fontWeight: '300',
    color: '#fff'
  },
  sitemapSectionRow: {
    marginTop: '10px',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.6)'
  },
  copyrightSection: {
    textAlign: 'center'
  },
  copyrightLink: {
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.6)'
  },

  title: {
    color: '#2E8555',
    fontWeight: 400,
    fontSize: '300%',
    lineHeight: '1em'
  },
  tagline: {
    fontWeight: 300,
    fontSize: '50%'
  },

  button: {
    margin: '4px',
    border: '1px solid #2E8555',
    borderRadius: '3px',
    color: '#2E8555',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.2em',
    padding: '10px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background 0.3s, color 0.3s'
  }
}

module.exports = MainTheme;
