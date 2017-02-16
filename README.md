# Reveal-Bar (Vanilla JS)

Vanilla Javscript to hide a top header bar as you scroll down, reveal it as you scroll back up, and fix it to the top of the window when visible.

Based on the jQuery plugin [DesignerNews/Reveal-Bar](https://github.com/DesignerNews/Reveal-Bar).

## Example

Check out the [CodePen Demo](https://forc.ir/2kWOXcQ" target=)

## Usage

Create a top bar/header element that is absolutely positioned, then invoke the library on it with:

```Javascript
// select your element
revealbar("#site-header", {
  bottomOffset: 40,

  onDetach: function() {
    document.body.classList.add("header-fixed");
  }.bind(this),
  onAttach: function() {
    document.body.classList.remove("header-fixed");
  }.bind(this),
  onShow: function() {
    window.revealBarIsVisible = !0;
    console.log( `revealBarIsVisible = ` + window.revealBarIsVisible );
  },
  onHide: function() {
    window.revealBarIsVisible = !1;
    console.log( `revealBarIsVisible = ` + window.revealBarIsVisible );
  }
});
```

## Options

We've matched the options on [DesignerNews/Reveal-Bar](https://github.com/DesignerNews/Reveal-Bar).

* _Function_ `onDetach`

    Called when the element is detached from the top (its initial state).

* _Function_ `onAttach`

    Called when the element is attached to the top (its initial state).

* _Function_ `onShow`

    Called when the element becomes visible when scrolling.

* _Function_ `onHide`

    Called when the element becomes hidden when scrolling.

* _Number_ `bottomOffset`

    The amount in pixels that the element should be offset on the bottom when scrolling.

## Methods

* `revealbar("#site-header", destroy() );`

    Resets element to its original position, disables the listener, and calls options.onAttach.
