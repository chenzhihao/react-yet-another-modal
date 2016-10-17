import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../src/index';
import ResizableModal from './ResizableModal';
import ShortContentModal from './ShortContentModal';
import NestModal from './NestModal';
import ProgrammaticallyCloseModal from './ProgrammaticallyCloseModal';

ReactDOM.render(
  <div>
    Make the screen very long, please scroll down.
    <div style={{paddingTop: '300px'}}>Scroll down</div>
    <div style={{paddingTop: '300px'}}>Scroll down</div>
    <div style={{paddingTop: '300px'}}>Scroll down</div>
    <div style={{paddingTop: '300px'}}>Scroll down</div>
    <div style={{paddingTop: '300px'}}>Scroll down</div>
    <Modal
      link={<button>Open a content resizable modal</button>}
      title="A content resizable modal"
    >
      <ResizableModal />
    </Modal>

    <Modal
      link={<button>Open a small modal</button>}
      title="A short content modal"
    >
      <ShortContentModal />
    </Modal>

    <Modal
      link={<button>Open a nested modal</button>}
      title="A nested modal, the z-index and style will be handle automatically"
    >
      <NestModal />
    </Modal>

    <Modal
      link={<button>Open a programmatically close modal</button>}
      title="Modal"
    >
      <ProgrammaticallyCloseModal />
    </Modal>
  </div>
  , document.getElementById('app'));
