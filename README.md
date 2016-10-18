# react-yet-another-modal
[![NPM](https://nodei.co/npm/react-yet-another-modal.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-yet-another-modal/)

> React modal which is dead simple, semantic, flexible.

## Showcase
![](http://imgur.com/L7AmXs5.gif)
## Features

- transports modal content into a new React component and appends it to the **document.body** (creates a new independent React tree)
- automatically resize modal to fit your screen size change
- can be opened by the prop **isOpened**
- can be opened after a click on an element that you pass through the prop **link** (and then it takes care of the open/close state)
- doesn't leave any mess in DOM after closing
- provides its child with **this.props.closePortal** callback
- can be closed by **closeOnEsc** and **closeOnOutsideClick**
- handle modal nesting style and all their z-index automatically

## Demo

Try [https://react-yet-another-modal] **or**

```shell
git clone https://github.com/chenzhihao/react-yet-another-modal
cd react-yet-another-modal
npm install
npm run dev
open localhost:8080
```

## Installation

```shell
npm install react-yet-another-modal --save
```

## Usage
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-yet-another-modal';

export default class App extends React.Component {
  render() {
    return
      <Modal
        title="Yet another modal"
        link={<button>Open a modal</button>}
      >
        <div>
          here we go, your modal content should be here.
        </div>
      </Modal>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('react-body'));
```
## Documentation - props

### Always required

#### children : ReactElement
The portal expects one child (`<Modal><Child ... /></Modal>`) that will be ported.

### link : ReactElement
The Modal button/text or any ReactElement which is used to open the modal. This element will be rendered by the Modal immediately.

### Optional

#### isOpened : bool
If true, the modal is open. If false, the portal is closed. It's up to you to take care of the closing (aka taking care of the state). Don't use this prop if you want to make your life easier. Use **link** instead!

#### beforeCloseCallback : function
The callback before the Modal close.

#### closeOnEsc: bool
If true, the Modal can be closed by the key ESC.

#### closeOnOutsideClick: bool
If true, the Modal can be closed by the outside mouse click.

#### onOpen: func(DOMNode)
This callback is called when the Modal is opened and rendered (useful for animating the DOMNode).

#### beforeClose: func(DOMNode)
This callback is called before Modal close. You can do some DOMNode animation first and it will removes itself from DOM.

#### onClose: func
This callback is called when the portal closes and after beforeClose.


## Tips & Tricks
- Close modal programmatically

Sometimes you need to close your modal programmatically.
A props **closePortal** is injected into your Modal Content Component automatically directly.

```jsx
  <Modal title="My modal">
    <div>
      <section>
        <button onClick={()=>this.props.closePortal()}>
          Close
        </button>
      </section>
    </div>
  </Modal>
```
