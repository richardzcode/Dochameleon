const React = require('react');

const open = {
  box: {
    position: 'relative',
    height: '10px',
    width: '10px',
    display: 'inline-block',
    margin: '2px',
    marginRight: '12px'
  },
  upper: {
    position: 'absolute',
    top: '0',
    left: '2px',
    background: 'transparent',
    borderWidth: '0 5px 5px',
    borderStyle: 'solid',
    borderColor: 'transparent #2E8555',
    height: '0',
    opacity: '1',
    width: '5px',
    zIndex: '10'
  },
  lower: {
    position: 'absolute',
    top: '100%',
    left: '2px',
    background: 'transparent',
    borderWidth: '0 5px 5px',
    borderStyle: 'solid',
    borderColor: 'transparent #2E8555',
    height: '0',
    opacity: '1',
    width: '5px',
    zIndex: '10',
    transform: 'rotate(180deg)'
  },
  forward: {
    position: 'absolute',
    top: '0',
    left: '8px',
    width: '3px',
    height: '6px',
    border: '5px solid #2E8555',
    borderWidth: '5px 0',
    transform: 'rotate(45deg)',
    zIndex: '1'
  },
  backward: {
    position: 'absolute',
    top: '0',
    left: '8px',
    width: '3px',
    height: '6px',
    border: '5px solid #2E8555',
    borderWidth: '5px 0',
    transform: 'rotate(-45deg)',
    zIndex: '1'
  }
};

const close = {
  box: {
    position: 'relative',
    height: '10px',
    width: '10px',
    display: 'inline-block',
    margin: '2px',
    marginRight: '12px'
  },
  upper: {
    position: 'absolute',
    height: '0',
    width: '0'
  },
  lower: {
    position: 'absolute',
    height: '0',
    width: '0'
  },
  forward: {
    position: 'absolute',
    top: '0',
    left: '8px',
    width: '3px',
    height: '0',
    border: '5px solid #2E8555',
    borderWidth: '8px 0',
    transform: 'rotate(45deg)',
    zIndex: '1'
  },
  backward: {
    position: 'absolute',
    top: '0',
    left: '8px',
    width: '3px',
    height: '0',
    border: '5px solid #2E8555',
    borderWidth: '8px 0',
    transform: 'rotate(-45deg)',
    zIndex: '1'
  }
};

class CollapseIcon extends React.Component {
  render() {
    const { targetId } = this.props;
    const script = `
      var open = document.getElementById('collapse_open');
      var close = document.getElementById('collapse_close');
      open.onclick=function() {
        open.style.display = 'none';
        close.style.display = 'inline-block';
        var targetId = open.getAttribute('target_id');
        var targetEl = document.getElementById(targetId);
        if (targetEl) { targetEl.style.display = ''; }
      };
      close.onclick=function() {
        close.style.display = 'none';
        open.style.display = 'inline-block';
        var targetId = open.getAttribute('target_id');
        var targetEl = document.getElementById(targetId);
        if (targetEl) { targetEl.style.display = 'none'; }
      };
`;
    const open_box_style = Object.assign({}, open.box, {display: 'none'});
    return (
      <React.Fragment>
        <div style={open_box_style} id="collapse_open" target_id={targetId}>
          <div style={open.upper}></div>
          <div style={open.lower}></div>
          <div style={open.forward}></div>
          <div style={open.backward}></div>
        </div>
        <div style={close.box} id="collapse_close">
          <div style={close.upper}></div>
          <div style={close.lower}></div>
          <div style={close.forward}></div>
          <div style={close.backward}></div>
        </div>
        <script dangerouslySetInnerHTML={{__html: script}}></script>
      </React.Fragment>
    )
  }
}

module.exports = CollapseIcon;
