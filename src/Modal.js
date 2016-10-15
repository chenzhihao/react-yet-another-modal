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
import Portal from './portal';
import style from './Modal.scss';
import cx from 'classnames';
import _ from 'lodash';

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
        ref="portal"
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        openByClickOn={this.props.link}
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
  closeOnEsc: React.PropTypes.bool,
  link: React.PropTypes.element,
  children: React.PropTypes.node.isRequired,
  closeOnOutsideClick: React.PropTypes.bool,
  beforeCloseCallback: React.PropTypes.func,
  title: React.PropTypes.string,
  isOpened: React.PropTypes.bool,
  styleProps: React.PropTypes.object,
};

class PseudoModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    // make a newer modal can overlap on the elder modal
    overlayZIndex++;
    contentZIndex++;

    document.body.style.overflow = 'hidden';
    modalActiveCounter++;

    this.setState({overlayDomHeight: this.overlayDomHeight}); //eslint-disable-line
  }

  componentWillUnmount () {
    overlayZIndex--;
    contentZIndex--;

    modalActiveCounter--;
    if (modalActiveCounter === 0) {
      document.body.style.overflow = 'auto';
    }
  }

  render () {
    return (
      <div>
        <div className={style.overlay}
             style={{zIndex: overlayZIndex}}
             ref={overlayDom=> {
               if (overlayDom) {
                 this.overlayDomHeight = overlayDom.getBoundingClientRect().height;
               }
             }}
        >
        </div>
        <div className={style.content}
             style={{
               width: _.get(this.props, 'styleProps.width', defaultStyle.width),
               zIndex: contentZIndex
             }}
        >
          <div className={cx(style.modalHead, style.clearfix)}>
            <h2 style={{float: 'left'}}>{this.props.title}</h2>
            <span
              className={style.closeBtn}
              onClick={
                ()=> {
                  this.props.beforeCloseCallback && this.props.beforeCloseCallback();
                  this.props.closePortal();
                }}
            >
            </span>
          </div>
          <div style={{maxHeight: this.state.overlayDomHeight ? (this.state.overlayDomHeight * 0.9) - 90 + 'px' : 'auto', overflowY: 'auto'}}>
            <div className={style.userContent}>
              {/* just pass in closePortal Callback  */}
              <div>{React.cloneElement(this.props.content, {closePortal: this.props.closePortal})}</div>
            </div>
          </div>
          <div className={style.footer}>
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
};
