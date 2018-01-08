const React = require('react');
const { H2, H5, Div, P, Row, Col } = require('fluid-react');

const users = require('./users.json');

const Showcase = props => {
  if (users.length === 0) { return null; }

  const { site } = props;
  const { theme } = site;
  const show_users = users.filter(user => !props.pinned || user.pinned);
  const userComps = show_users.map((user, i) => {
    return (
      <Col xs={6} sm={4} md={3} lg={2} xl={1} key={i}>
        <a href={user.link} style={theme.showcaseBox}>
          <img src={site.url(user.img)} title={user.caption} />
        </a>
      </Col>
    );
  });

  return (
    <Div style={theme.showcase}>
      <H2 style={theme.h2}>Who's Using This?</H2>
      <H5 style={theme.h5}>This project is used by all these people</H5>
      <Row>
        {userComps}
      </Row>
    </Div>
  );
};

module.exports = Showcase;
