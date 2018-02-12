const color = require('./color.js');

const BlogTheme = { blog: {
  post: {
    padding: '20px'
  },
  title: {
    color: color.title,
    fontWeight: 300,
    fontSize: '200%',
    lineHeight: '1em'
  },
  titleLink: {
    color: color.title
  },
  authorBlock: {
    display: 'flex'
  },
  authorName: {
    paddingTop: '5px'
  },
  authorNameLink: {
    color: color.title
  },
  authorImgContainer: {
    marginLeft: '0.5em',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  readMore: {
    marginTop: '0.5em'
  }
}};

module.exports = BlogTheme;
