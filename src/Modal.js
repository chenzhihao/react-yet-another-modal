/*
 <Modal
 link={<a>Open me</a>}
 isOpened={true}
 >
 <div>
 ....
 </div>
 </Modal>

 or

 <Modal link={<span>click to open dialog</span>}>
 <YourComponent />
 </Modal>
 */

import React from 'react';
import Portal from './Portal';
import './Modal.scss';
import cx from 'classnames';

const defaultStyle = {
  width: '80%',
};

let overlayZIndex = 999;
let contentZIndex = 1000;
let modalActiveCounter = 0;

export default class Modal extends React.Component {
  render () {
    let {closeOnEsc, closeOnOutsideClick} = this.props;
    if (closeOnEsc === undefined) {
      closeOnEsc = false;
    }
    if (closeOnOutsideClick === undefined) {
      closeOnOutsideClick = false;
    }
    return (
      <Portal
        {...this.props}
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        openByClickOn={this.props.link}
        onOpen={this.props.onOpen}
        beforeClose={this.props.beforeClose}
        onClose={this.props.onClose}
      >
        <PseudoModal
          title={this.props.title}
          content={this.props.children}
          styleProps={this.props.styleProps}
          beforeCloseCallback={this.props.beforeCloseCallback}
        />
      </Portal>
    );
  }
}

Modal.propTypes = {
  link: React.PropTypes.element.isRequired,
  children: React.PropTypes.node.isRequired,
  closeOnEsc: React.PropTypes.bool,
  isOpened: React.PropTypes.bool,
  closeOnOutsideClick: React.PropTypes.bool,
  beforeCloseCallback: React.PropTypes.func,
  title: React.PropTypes.string,
  styleProps: React.PropTypes.object,
  onOpen: React.PropTypes.func,
  beforeClose: React.PropTypes.func,
  onClose: React.PropTypes.func,
};

class PseudoModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.calculateWindowInnerHeight = () => {
      this.contentMaxHeight = window.innerHeight;
      this.setState({contentMaxHeight: this.contentMaxHeight});
    };
  }

  componentDidMount () {
    // make a newer modal can overlap on the elder modal
    overlayZIndex++;
    contentZIndex++;

    document.body.style.overflow = 'hidden';
    modalActiveCounter++;

    window.addEventListener('resize', this.calculateWindowInnerHeight);

    this.calculateWindowInnerHeight();
    this.setState({contentMaxHeight: this.contentMaxHeight}); //eslint-disable-line
  }

  componentWillUnmount () {
    overlayZIndex--;
    contentZIndex--;

    modalActiveCounter--;
    if (modalActiveCounter === 0) {
      document.body.style.overflow = 'auto';
    }

    window.removeEventListener('resize', this.calculateWindowInnerHeight);
  }

  render () {
    return (
      <div className="ryam">
        <div className={'overlay'}
             style={{zIndex: overlayZIndex}}

        >
        </div>
        <div className={'content'}
             style={{
               width: this.props.styleProps && this.props.styleProps.width || defaultStyle.width,
               zIndex: contentZIndex
             }}
        >
          <div className={cx('modalHead', 'clearfix')}>
            <h2 className={cx('title')}>{this.props.title}</h2>
            <span
              className={'closeBtn'}
              onClick={
                ()=> {
                  this.props.beforeCloseCallback && this.props.beforeCloseCallback();
                  this.props.closePortal();
                }}
            >
            </span>
          </div>
          <div style={{maxHeight: this.state.contentMaxHeight ? (this.state.contentMaxHeight * 0.9) - 90 + 'px' : 'auto', overflowY: 'auto'}}>
            <div className={'userContent'}>
              {/* just pass in closePortal Callback  */}
              <div>{React.cloneElement(this.props.content, {closePortal: this.props.closePortal})}</div>
            </div>
          </div>
          <div className={'footer'}>
          </div>
        </div>
      </div>
    );
  }
}

PseudoModal.propTypes = {
  closePortal: React.PropTypes.func,
  beforeCloseCallback: React.PropTypes.func,
  content: React.PropTypes.element.isRequired,
  title: React.PropTypes.string,
  styleProps: React.PropTypes.object,
};
