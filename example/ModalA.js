import React, {
  Component,
  PropTypes,
} from 'react';

class ModalA extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {longContent: true};
  }

  render () {
    return (
      <div>
        <span>Very long content.</span>
        <div style={{paddingTop: this.state.longContent ? '2000px' : '0px'}}>
          <span>Really long</span>
        </div>
        <button onClick={e=> this.setState({longContent: !this.state.longContent})}>toggle</button>
      </div>
    );
  }
}

ModalA.propTypes = {};
ModalA.defaultProps = {};

export default ModalA;
