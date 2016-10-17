import React, {
  Component,
} from 'react';

class ModalB extends Component {
  render () {
    return (
      <div>
        <section>
          Take a look at the outer scroll bar. It's gone however will back when you close the modal.
        </section>
      </div>
    );
  }
}

ModalB.propTypes = {};
ModalB.defaultProps = {};

export default ModalB;
