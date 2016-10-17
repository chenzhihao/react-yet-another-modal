import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../src/index';
import ModalA from '../example/ModalA';
import ModalB from '../example/ModalB';

ReactDOM.render(
  <div>
    test
    <div style={{paddingTop: '2000px'}}></div>
    <Modal
      link={<div>Open me</div>}
      title="abc"
    >
      <ModalA />
    </Modal>

    <Modal
      link={<div>Open me a small overlay</div>}
      title="abc"
    >
      <ModalB />
    </Modal>
  </div>
  , document.getElementById('app'));
