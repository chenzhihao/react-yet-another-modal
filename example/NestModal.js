import React, {
  Component,
} from 'react';
import Modal from '../src/Modal';

import AnotherModal from './ShortContentModal';

class NestModal extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {longContent: true};
  }

  render () {
    return (
      <div>
        <div>
          Open another nested modal, the z-index and style will be handle automatically
        </div>
        <Modal
          title={'modal'}
          link={<button>Open a nested modal</button>}
        >
          <AnotherModal />
        </Modal>
        <span>
        </span>
      </div>
    );
  }
}

export default NestModal;
