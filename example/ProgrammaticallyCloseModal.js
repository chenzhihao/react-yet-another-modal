import React, {
  Component,
  PropTypes,
} from 'react';

class ProgrammaticallyCloseModal extends Component {
  render () {
    return (
      <div>
        <section>
          <button onClick={()=>this.props.closePortal()}>
            Close
          </button>
        </section>
      </div>
    );
  }
}

ProgrammaticallyCloseModal.propTypes = {
  closePortal: PropTypes.func,
};
ProgrammaticallyCloseModal.defaultProps = {};

export default ProgrammaticallyCloseModal;
