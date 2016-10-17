import React, {
  Component,
} from 'react';

class ResizableModal extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {longContent: true};
  }

  render () {
    return (
      <div>
        <button onClick={e=> this.setState({longContent: !this.state.longContent})}>
          Resize modal content.
        </button>
        <div>{this.state.longContent ? 'Very long content. Please scroll down' : 'Short content'}</div>
        <div style={{paddingTop: this.state.longContent ? '2000px' : '0px'}}>
          <span>Content end.</span>
        </div>

      </div>
    );
  }
}

export default ResizableModal;
