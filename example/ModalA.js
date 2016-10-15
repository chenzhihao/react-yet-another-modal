import React, {
  Component,
  PropTypes,
} from 'react';
import Modal from '../src/Modal';

import ModalB from './ModalB';

class ModalA extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {longContent: true};
  }

  render () {
    return (
      <div>
        <Modal
          title={'modal'}
          link={<span>Open</span>}
        >
          <ModalB></ModalB>
        </Modal>
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
