/**
*
* Reveal Bar (vanilla JS)
* based on https://github.com/DesignerNews/Reveal-Bar
*
* @author Nick Hartskeerl <apachenick@hotmail.com>
*
*/
var revealbar = function(query, _options) {

  function offset(elem) {

    var doc, docElem, rect, win;

    if(!elem ) {
      return;
    }

    if(!elem.getClientRects().length) {
      return { top: 0, left: 0 };
    }

    rect = elem.getBoundingClientRect();

    doc = elem.ownerDocument;
    docElem = doc.documentElement;
    win = doc.defaultView;

    return {
      top: rect.top + win.pageYOffset - docElem.clientTop,
      left: rect.left + win.pageXOffset - docElem.clientLeft
    };

  }

  function css(element, selector) {

    if(typeof selector == "object") {

      for(var key in selector) {

        if(!selector.hasOwnProperty(key)) {
          continue;
        }

        var value = selector[key];

        key = key.replace(/-([a-z0-9_])/g, function(string, letter) {
          return letter.toUpperCase();
        }).replace("-", "");

        element.style[key] = value;

      }

      return;

    }

    var value = window.getComputedStyle(element).getPropertyValue(selector);

    return value;

  }

  function outerHeight(element) {
    return element.offsetHeight;
  }

  function height(element) {

    if(element == window || element == document) {
      return element.innerHeight;
    }

    var height = css(element, "height");

    return parseFloat(height);

  }

  var $bar = document.querySelector(query);

  var noop = function() {

  };

  var options = {
    onAttach: noop,
    onDetach: noop,
    onShow: noop,
    onHide: noop,
    bottomOffset: 0
  };

  for(var key in _options) {
    if(options.hasOwnProperty(key)) {
      options[key] = _options[key];
    }
  }

  var $window = window,
      $document = document,
      lastPosition = window.pageYOffset,
      initialBarPosition = offset($bar).top,
      isiOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

  if (isiOS) return;

  var scroll = function(e) {

    var currentPosition = window.pageYOffset,
    barFullHeight = outerHeight($bar),
    barOffsetHeight = barFullHeight - options.bottomOffset,
    barTopPosition = offset($bar).top;

    if(currentPosition < 0 || currentPosition > (height($document) - height($window))) {
      return;
    }

    if(currentPosition < lastPosition) {

      if (currentPosition === 0) {
        options.onAttach();
      } else {

        if(css($bar, 'position') === 'fixed' && currentPosition > barTopPosition) {

          css($bar, {
            'position': 'absolute',
            'top': (barTopPosition + 1)+'px'
          });

        } else if(css($bar, 'position') === 'absolute' && currentPosition <= barTopPosition) {

          options.onShow();

          css($bar, {
            'position': 'fixed',
            'top': '0px'
          });

        };

      }

    } else if(currentPosition > lastPosition || (currentPosition === lastPosition && currentPosition !== 0)) {

      if(currentPosition > barTopPosition + barOffsetHeight) {

        options.onDetach();
        options.onHide();

        css($bar, {
          'position': 'fixed',
          'top': -barOffsetHeight+'px'
        });

      } else if (currentPosition !== barTopPosition + barOffsetHeight) {

        css($bar, {
          'position': 'absolute',
          'top': barTopPosition+'px'
        });

      };

    }

    lastPosition = currentPosition;

  };

  scroll(window.event);
  window.addEventListener("scroll", scroll);

  this.destroy = function() {

    window.removeEventListener("scroll", scroll);
    options.onAttach();

    css($bar, {
      'position': 'absolute',
      'top': initialBarPosition + 'px'
    });

  };

};
