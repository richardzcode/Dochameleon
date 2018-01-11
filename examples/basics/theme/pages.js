const color = require('./color.js');

const pages = {
  block: {
    padding: '60px 10px'
  },
  blockEven: {
    padding: '60px 10px',
    background: '#e9e9e9'
  },
  homeSplash: {
    padding: '2em 10px',
    textAlign: 'center'
  },
  promoSection: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    fontSize: '125%',
    lineHeight: '1.6em',
    position: 'relative',
    zIndex: '99'
  },
  featureImageContainer: {
    textAlign: 'center'
  },
  featureImage: {
    maxWidth: '80px'
  },
  featureCalloutTitle: {
    textAlign: 'left',
    textDecoration: 'none',
    color: color.title,
    fontWeight: '300',
    fontSize: '180%',
    lineHeight: '1em'
  },
  featureCalloutImageContainer: {
    textAlign: 'center'
  },
  featureCalloutImage: {
    maxWidth: '80%'
  },
  showcaseBox: {
    display: 'block',
    padding: '20px',
    width: '80px'
  },
  showcaseImage: {
    maxWidth: '100%'
  },
  helpTitle: {
    textAlign: 'left',
    color: color.title,
    fontWeight: '300',
    fontSize: '200%',
    lineHeight: '1em'
  },
  helpSection: {
    padding: '20px'
  },
  helpSectionTitle: {
    textAlign: 'left',
    color: color.title,
    fontWeight: '300',
    fontSize: '150%',
    lineHeight: '1em'
  }
};

module.exports = pages;
