const color = require('./color.js');

const reset = {}

reset['html, body, div, span, applet, object, iframe,' +
  'h1, h2, h3, h4, h5, h6, p, blockquote, pre,' +
  'a, abbr, acronym, address, big, cite, code,' +
  'del, dfn, em, img, ins, kbd, q, s, samp,' +
  'small, strike, strong, sub, sup, tt, var,' +
  'b, u, i, center,' +
  'dl, dt, dd, ol, ul, li,' +
  'fieldset, form, label, legend,' +
  'table, caption, tbody, tfoot, thead, tr, th, td,' +
  'article, aside, canvas, details, embed,' +
  'figure, figcaption, footer, header, hgroup,' +
  'menu, nav, output, ruby, section, summary,' +
  'time, mark, audio, video'] = {
  margin: '0',
  padding: '0',
  border: '0'
};

reset['article, aside, details, figcaption, figure,' +
  'footer, header, hgroup, menu, nav, section'] = {
  display: 'block'
};

reset['body'] = {
  lineHeight: '1'
};

reset['blockquote, q'] = {
  quotes: 'none'
};

reset['blockquote:before, blockquote:after,' +
  'q:before, q:after'] = {
  content: '',
  content: 'none'
};

reset['table'] = {
  borderCollapse: 'collapse',
  borderSpacing: '0'
};

reset['p'] = {
  lineHeight: '1.4'
};

reset['img'] = {
  maxWidth: '100%',
  height: 'auto'
};

reset['article p img, article iframe'] = {
  maxWidth: '100%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

reset['a'] = {
  color: color.clickable,
  textDecoration: 'none'
};

reset['a.hash-link'] = {
  float: 'left',
  paddingRight: '4px',
  marginTop: '4px',
  marginLeft: '-20px',
  lineHeight: '1.2',
  opacity: '0',
  transition: 'opacity 0.3s'
};

reset['h1:hover .hash-link,' +
  'h2:hover .hash-link,' +
  'h3:hover .hash-link,' +
  'h4:hover .hash-link'] = {
  opacity: '0.5',
  transition: 'none'
};

reset['a.hash-link:hover'] = {
  opacity: '1!important',
  transition: 'none'
};

reset['blockquote'] = {
  padding: '15px 30px 15px 15px',
  margin: '20px 0',
  backgroundColor: 'rgba(204, 122, 111, 0.1)',
  borderLeft: '5px solid rgba(191, 87, 73, 0.2)'
};

reset['ul, ol'] = {
  padding: '10px 20px'
};

reset['input::-webkit-input-placeholder'] = {
  color: '#e5e5e5'
};

reset['input::-moz-placeholder'] = {
  color: '#e5e5e5'
};

reset['input::placeholder'] = {
  color: '#e5e5e5'
};

const resetTheme = { reset };

module.exports = resetTheme;
