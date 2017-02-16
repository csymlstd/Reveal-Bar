# Reveal-Bar (Vanilla JS)

Vanilla Javscript to hide a top header bar as you scroll down, reveal it as you scroll back up, and fix it to the top of the window when visible

### Example

Check out the [CodePen Demo](https://forc.ir/2kWOXcQ)

### Usage

```Javascript
// select your element
revealbar("#site-header", {
  bottomOffset: 40, // Height of area that remains exposed

  onDetach: function() {
    document.body.classList.add("header-fixed");
  }.bind(this),
  onAttach: function() {
    document.body.classList.remove("header-fixed");
  }.bind(this),
  onShow: function() {
    window.revealBarIsVisible = 1;
  },
  onHide: function() {
    window.revealBarIsVisible = 0;
  }
})
```

### Options

_working on it!_
