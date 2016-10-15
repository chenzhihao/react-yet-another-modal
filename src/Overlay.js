/*
 <Overlay
 link={<a>Open me</a>}
 isOpened={true}
 >
 <div>
 ....
 </div>
 </Overlay>

 or

 <Overlay link={<span>click to open dialog</span>}>
 <YourComponent />
 </Overlay>
 */

import React from 'react';
import Portal from './portal';
import style from './Overlay.scss';
import cx from 'classnames';
import _ from 'lodash';

const defaultStyle = {
  width: '80%',
};

let overlayZIndex = 999;
let contentZIndex = 1000;
let modalActiveCounter = 0;

export default class Overlay extends React.Component {
  componentWillUnmount () {
    overlayZIndex--;
    contentZIndex--;
  }

  render () {
    // make a newer modal can overlap on the elder modal
    overlayZIndex++;
    contentZIndex++;
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
        <PseudoOverlay
          title={this.props.title}
          content={this.props.children}
          styleProps={this.props.styleProps}
          beforeCloseCallback={this.props.beforeCloseCallback}
        />
      </Portal>
    );
  }
}

Overlay.propTypes = {
  closeOnEsc: React.PropTypes.bool,
  link: React.PropTypes.element,
  children: React.PropTypes.node.isRequired,
  closeOnOutsideClick: React.PropTypes.bool,
  beforeCloseCallback: React.PropTypes.func,
  title: React.PropTypes.string,
  isOpened: React.PropTypes.bool,
  styleProps: React.PropTypes.object,
};

class PseudoOverlay extends React.Component {
  componentDidMount () {
    modalActiveCounter++;
    console.log('mount', modalActiveCounter);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount () {
    modalActiveCounter--;
    console.log('unmount', modalActiveCounter);
    if (modalActiveCounter === 0) {
      document.body.style.overflow = 'auto';
    }
  }

  render () {
    return (
      <div >
        <div className={style.overlay}
             style={{zIndex: overlayZIndex}}
        >
        </div>
        <div style={{position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', 'overflow': 'auto', zIndex: contentZIndex}}>
          <div className={cx(style.content)}
               ref={contentDom=> {
                 if (!contentDom) {
                   return;
                 }
                 const rect = contentDom.getBoundingClientRect();
                 if (rect.bottom - rect.top > window.innerHeight) {
                   contentDom.style.top = '40px';
                   contentDom.style.transform = 'translate(-50%)';
                 } else {
                   contentDom.style.top = '50%';
                   contentDom.style.transform = 'translate(-50%, -50%)';
                 }
               }}
               style={{
                 width: _.get(this.props, 'styleProps.width', defaultStyle.width),
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
            <div>
              <div className={style.userContent}>
                {/* just pass in closePortal Callback  */}
                <div>{React.cloneElement(this.props.content, {closePortal: this.props.closePortal})}</div>
              </div>
            </div>
            <div className={style.footer}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PseudoOverlay.propTypes = {
  closePortal: React.PropTypes.func,
  beforeCloseCallback: React.PropTypes.func,
  content: React.PropTypes.element.isRequired,
  title: React.PropTypes.string,
};

