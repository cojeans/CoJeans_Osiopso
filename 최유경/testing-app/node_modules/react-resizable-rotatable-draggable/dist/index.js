'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var getLength = function getLength(x, y) {
  return Math.sqrt(x * x + y * y);
};
var getAngle = function getAngle(_ref, _ref2) {
  var x1 = _ref.x,
      y1 = _ref.y;
  var x2 = _ref2.x,
      y2 = _ref2.y;
  var dot = x1 * x2 + y1 * y2;
  var det = x1 * y2 - y1 * x2;
  var angle = Math.atan2(det, dot) / Math.PI * 180;
  return (angle + 360) % 360;
};
var degToRadian = function degToRadian(deg) {
  return deg * Math.PI / 180;
};

var cos = function cos(deg) {
  return Math.cos(degToRadian(deg));
};

var sin = function sin(deg) {
  return Math.sin(degToRadian(deg));
};

var setWidthAndDeltaW = function setWidthAndDeltaW(width, deltaW, minWidth) {
  var expectedWidth = width + deltaW;

  if (expectedWidth > minWidth) {
    width = expectedWidth;
  } else {
    deltaW = minWidth - width;
    width = minWidth;
  }

  return {
    width: width,
    deltaW: deltaW
  };
};

var setHeightAndDeltaH = function setHeightAndDeltaH(height, deltaH, minHeight) {
  var expectedHeight = height + deltaH;

  if (expectedHeight > minHeight) {
    height = expectedHeight;
  } else {
    deltaH = minHeight - height;
    height = minHeight;
  }

  return {
    height: height,
    deltaH: deltaH
  };
};

var getNewStyle = function getNewStyle(type, rect, deltaW, deltaH, ratio, minWidth, minHeight) {
  var width = rect.width,
      height = rect.height,
      centerX = rect.centerX,
      centerY = rect.centerY,
      rotateAngle = rect.rotateAngle;
  var widthFlag = width < 0 ? -1 : 1;
  var heightFlag = height < 0 ? -1 : 1;
  width = Math.abs(width);
  height = Math.abs(height);

  switch (type) {
    case 'r':
      {
        var widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
        width = widthAndDeltaW.width;
        deltaW = widthAndDeltaW.deltaW;

        if (ratio) {
          deltaH = deltaW / ratio;
          height = width / ratio; // 左上角固定

          centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
          centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
        } else {
          // 左边固定
          centerX += deltaW / 2 * cos(rotateAngle);
          centerY += deltaW / 2 * sin(rotateAngle);
        }

        break;
      }

    case 'tr':
      {
        deltaH = -deltaH;

        var _widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);

        width = _widthAndDeltaW.width;
        deltaW = _widthAndDeltaW.deltaW;
        var heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
        height = heightAndDeltaH.height;
        deltaH = heightAndDeltaH.deltaH;

        if (ratio) {
          deltaW = deltaH * ratio;
          width = height * ratio;
        }

        centerX += deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
        centerY += deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
        break;
      }

    case 'br':
      {
        var _widthAndDeltaW2 = setWidthAndDeltaW(width, deltaW, minWidth);

        width = _widthAndDeltaW2.width;
        deltaW = _widthAndDeltaW2.deltaW;

        var _heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);

        height = _heightAndDeltaH.height;
        deltaH = _heightAndDeltaH.deltaH;

        if (ratio) {
          deltaW = deltaH * ratio;
          width = height * ratio;
        }

        centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
        centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
        break;
      }

    case 'b':
      {
        var _heightAndDeltaH2 = setHeightAndDeltaH(height, deltaH, minHeight);

        height = _heightAndDeltaH2.height;
        deltaH = _heightAndDeltaH2.deltaH;

        if (ratio) {
          deltaW = deltaH * ratio;
          width = height * ratio; // 左上角固定

          centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
          centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
        } else {
          // 上边固定
          centerX -= deltaH / 2 * sin(rotateAngle);
          centerY += deltaH / 2 * cos(rotateAngle);
        }

        break;
      }

    case 'bl':
      {
        deltaW = -deltaW;

        var _widthAndDeltaW3 = setWidthAndDeltaW(width, deltaW, minWidth);

        width = _widthAndDeltaW3.width;
        deltaW = _widthAndDeltaW3.deltaW;

        var _heightAndDeltaH3 = setHeightAndDeltaH(height, deltaH, minHeight);

        height = _heightAndDeltaH3.height;
        deltaH = _heightAndDeltaH3.deltaH;

        if (ratio) {
          height = width / ratio;
          deltaH = deltaW / ratio;
        }

        centerX -= deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
        centerY -= deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
        break;
      }

    case 'l':
      {
        deltaW = -deltaW;

        var _widthAndDeltaW4 = setWidthAndDeltaW(width, deltaW, minWidth);

        width = _widthAndDeltaW4.width;
        deltaW = _widthAndDeltaW4.deltaW;

        if (ratio) {
          height = width / ratio;
          deltaH = deltaW / ratio; // 右上角固定

          centerX -= deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
          centerY -= deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
        } else {
          // 右边固定
          centerX -= deltaW / 2 * cos(rotateAngle);
          centerY -= deltaW / 2 * sin(rotateAngle);
        }

        break;
      }

    case 'tl':
      {
        deltaW = -deltaW;
        deltaH = -deltaH;

        var _widthAndDeltaW5 = setWidthAndDeltaW(width, deltaW, minWidth);

        width = _widthAndDeltaW5.width;
        deltaW = _widthAndDeltaW5.deltaW;

        var _heightAndDeltaH4 = setHeightAndDeltaH(height, deltaH, minHeight);

        height = _heightAndDeltaH4.height;
        deltaH = _heightAndDeltaH4.deltaH;

        if (ratio) {
          width = height * ratio;
          deltaW = deltaH * ratio;
        }

        centerX -= deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
        centerY -= deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
        break;
      }

    case 't':
      {
        deltaH = -deltaH;

        var _heightAndDeltaH5 = setHeightAndDeltaH(height, deltaH, minHeight);

        height = _heightAndDeltaH5.height;
        deltaH = _heightAndDeltaH5.deltaH;

        if (ratio) {
          width = height * ratio;
          deltaW = deltaH * ratio; // 左下角固定

          centerX += deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
          centerY += deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
        } else {
          centerX += deltaH / 2 * sin(rotateAngle);
          centerY -= deltaH / 2 * cos(rotateAngle);
        }

        break;
      }
  }

  return {
    position: {
      centerX: centerX,
      centerY: centerY
    },
    size: {
      width: width * widthFlag,
      height: height * heightFlag
    }
  };
};
var cursorStartMap = {
  n: 0,
  ne: 1,
  e: 2,
  se: 3,
  s: 4,
  sw: 5,
  w: 6,
  nw: 7
};
var cursorDirectionArray = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
var cursorMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 4,
  6: 4,
  7: 5,
  8: 6,
  9: 6,
  10: 7,
  11: 8
};
var getCursor = function getCursor(rotateAngle, d) {
  var increment = cursorMap[Math.floor(rotateAngle / 30)];
  var index = cursorStartMap[d];
  var newIndex = (index + increment) % 8;
  return cursorDirectionArray[newIndex];
};
var centerToTL = function centerToTL(_ref3) {
  var centerX = _ref3.centerX,
      centerY = _ref3.centerY,
      width = _ref3.width,
      height = _ref3.height,
      rotateAngle = _ref3.rotateAngle;
  return {
    top: centerY - height / 2,
    left: centerX - width / 2,
    width: width,
    height: height,
    rotateAngle: rotateAngle
  };
};
var tLToCenter = function tLToCenter(_ref4) {
  var top = _ref4.top,
      left = _ref4.left,
      width = _ref4.width,
      height = _ref4.height,
      rotateAngle = _ref4.rotateAngle;
  return {
    position: {
      centerX: left + width / 2,
      centerY: top + height / 2
    },
    size: {
      width: width,
      height: height
    },
    transform: {
      rotateAngle: rotateAngle
    }
  };
};

var StyledRect = styled.div.withConfig({
  displayName: "StyledRect",
  componentId: "sc-1uso172-0"
})(["position:absolute;border:1px solid #eb5648;.square{position:absolute;width:7px;height:7px;background:white;border:1px solid #eb5648;border-radius:1px;}.resizable-handler{position:absolute;width:14px;height:14px;cursor:pointer;z-index:1;&.tl,&.t,&.tr{top:-7px;}&.tl,&.l,&.bl{left:-7px;}&.bl,&.b,&.br{bottom:-7px;}&.br,&.r,&.tr{right:-7px;}&.l,&.r{margin-top:-7px;}&.t,&.b{margin-left:-7px;}}.rotate{position:absolute;cursor:pointer;left:50%;top:-26px;transform:translateX(-50%);& i{font-size:18px;display:inline-block;width:1em;height:1em;background-size:1em 1em;background-repeat:no-repeat;background-position:center center;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNOC4zIDUuNEw4IC40bDMuMiAyLjEgMS43IDF6Ii8+PG1hc2sgaWQ9ImIiIHg9IjAiIHk9IjAiIHdpZHRoPSI0LjkiIGhlaWdodD0iNC45IiBmaWxsPSIjZmZmIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PC9tYXNrPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBzdHJva2U9IiNGNTVENTQiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTExIDkuMkE2IDYgMCAwIDEgMCA2YTYgNiAwIDAgMSAxMC43LTMuOCIvPjx1c2UgbWFzaz0idXJsKCNiKSIgc3Ryb2tlLXdpZHRoPSIyIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyMSAwKSIgeGxpbms6aHJlZj0iI2EiLz48L2c+PC9zdmc+Cg==\");}}.t,.tl,.tr{top:-3px;}.b,.bl,.br{bottom:-3px;}.r,.tr,.br{right:-3px;}.tl,.l,.bl{left:-3px;}.l,.r{top:50%;margin-top:-3px;}.t,.b{left:50%;margin-left:-3px;}"]);

var zoomableMap = {
  'n': 't',
  's': 'b',
  'e': 'r',
  'w': 'l',
  'ne': 'tr',
  'nw': 'tl',
  'se': 'br',
  'sw': 'bl'
};

var Rect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Rect, _PureComponent);

  function Rect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Rect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Rect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setElementRef", function (ref) {
      _this.$element = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "startDrag", function (e) {
      var startX = e.clientX,
          startY = e.clientY;
      _this.props.onDragStart && _this.props.onDragStart();
      _this._isMouseDown = true;

      var onMove = function onMove(e) {
        if (!_this._isMouseDown) return; // patch: fix windows press win key during mouseup issue

        e.stopImmediatePropagation();
        var clientX = e.clientX,
            clientY = e.clientY;
        var deltaX = clientX - startX;
        var deltaY = clientY - startY;

        _this.props.onDrag(deltaX, deltaY);

        startX = clientX;
        startY = clientY;
      };

      var onUp = function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        if (!_this._isMouseDown) return;
        _this._isMouseDown = false;
        _this.props.onDragEnd && _this.props.onDragEnd();
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "startRotate", function (e) {
      if (e.button !== 0) return;
      var clientX = e.clientX,
          clientY = e.clientY;
      var startAngle = _this.props.styles.transform.rotateAngle;

      var rect = _this.$element.getBoundingClientRect();

      var center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      var startVector = {
        x: clientX - center.x,
        y: clientY - center.y
      };
      _this.props.onRotateStart && _this.props.onRotateStart();
      _this._isMouseDown = true;

      var onMove = function onMove(e) {
        if (!_this._isMouseDown) return; // patch: fix windows press win key during mouseup issue

        e.stopImmediatePropagation();
        var clientX = e.clientX,
            clientY = e.clientY;
        var rotateVector = {
          x: clientX - center.x,
          y: clientY - center.y
        };
        var angle = getAngle(startVector, rotateVector);

        _this.props.onRotate(angle, startAngle);
      };

      var onUp = function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        if (!_this._isMouseDown) return;
        _this._isMouseDown = false;
        _this.props.onRotateEnd && _this.props.onRotateEnd();
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "startResize", function (e, cursor) {
      if (e.button !== 0) return;
      document.body.style.cursor = cursor;
      var _this$props$styles = _this.props.styles,
          _this$props$styles$po = _this$props$styles.position,
          centerX = _this$props$styles$po.centerX,
          centerY = _this$props$styles$po.centerY,
          _this$props$styles$si = _this$props$styles.size,
          width = _this$props$styles$si.width,
          height = _this$props$styles$si.height,
          rotateAngle = _this$props$styles.transform.rotateAngle;
      var startX = e.clientX,
          startY = e.clientY;
      var rect = {
        width: width,
        height: height,
        centerX: centerX,
        centerY: centerY,
        rotateAngle: rotateAngle
      };
      var type = e.target.getAttribute('class').split(' ')[0];
      _this.props.onResizeStart && _this.props.onResizeStart();
      _this._isMouseDown = true;

      var onMove = function onMove(e) {
        if (!_this._isMouseDown) return; // patch: fix windows press win key during mouseup issue

        e.stopImmediatePropagation();
        var clientX = e.clientX,
            clientY = e.clientY;
        var deltaX = clientX - startX;
        var deltaY = clientY - startY;
        var alpha = Math.atan2(deltaY, deltaX);
        var deltaL = getLength(deltaX, deltaY);
        var isShiftKey = e.shiftKey;

        _this.props.onResize(deltaL, alpha, rect, type, isShiftKey);
      };

      var onUp = function onUp() {
        document.body.style.cursor = 'auto';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        if (!_this._isMouseDown) return;
        _this._isMouseDown = false;
        _this.props.onResizeEnd && _this.props.onResizeEnd();
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    return _this;
  }

  _createClass(Rect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$styles2 = _this$props.styles,
          _this$props$styles2$p = _this$props$styles2.position,
          centerX = _this$props$styles2$p.centerX,
          centerY = _this$props$styles2$p.centerY,
          _this$props$styles2$s = _this$props$styles2.size,
          width = _this$props$styles2$s.width,
          height = _this$props$styles2$s.height,
          rotateAngle = _this$props$styles2.transform.rotateAngle,
          zoomable = _this$props.zoomable,
          rotatable = _this$props.rotatable,
          parentRotateAngle = _this$props.parentRotateAngle;
      var style = {
        width: Math.abs(width),
        height: Math.abs(height),
        transform: "rotate(".concat(rotateAngle, "deg)"),
        left: centerX - Math.abs(width) / 2,
        top: centerY - Math.abs(height) / 2
      };
      var direction = zoomable.split(',').map(function (d) {
        return d.trim();
      }).filter(function (d) {
        return d;
      }); // TODO: may be speed up

      return React__default.createElement(StyledRect, {
        ref: this.setElementRef,
        onMouseDown: this.startDrag,
        className: "rect single-resizer",
        style: style
      }, rotatable && React__default.createElement("div", {
        className: "rotate",
        onMouseDown: this.startRotate
      }, React__default.createElement("i", null)), direction.map(function (d) {
        var cursor = "".concat(getCursor(rotateAngle + parentRotateAngle, d), "-resize");
        return React__default.createElement("div", {
          key: d,
          style: {
            cursor: cursor
          },
          className: "".concat(zoomableMap[d], " resizable-handler"),
          onMouseDown: function onMouseDown(e) {
            return _this2.startResize(e, cursor);
          }
        });
      }), direction.map(function (d) {
        return React__default.createElement("div", {
          key: d,
          className: "".concat(zoomableMap[d], " square")
        });
      }));
    }
  }]);

  return Rect;
}(React.PureComponent);

_defineProperty(Rect, "propTypes", {
  styles: PropTypes.object,
  zoomable: PropTypes.string,
  rotatable: PropTypes.bool,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
  onRotateStart: PropTypes.func,
  onRotate: PropTypes.func,
  onRotateEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  parentRotateAngle: PropTypes.number
});

var ResizableRect =
/*#__PURE__*/
function (_Component) {
  _inherits(ResizableRect, _Component);

  function ResizableRect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResizableRect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResizableRect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRotate", function (angle, startAngle) {
      if (!_this.props.onRotate) return;
      var rotateAngle = Math.round(startAngle + angle);

      if (rotateAngle >= 360) {
        rotateAngle -= 360;
      } else if (rotateAngle < 0) {
        rotateAngle += 360;
      }

      if (rotateAngle > 356 || rotateAngle < 4) {
        rotateAngle = 0;
      } else if (rotateAngle > 86 && rotateAngle < 94) {
        rotateAngle = 90;
      } else if (rotateAngle > 176 && rotateAngle < 184) {
        rotateAngle = 180;
      } else if (rotateAngle > 266 && rotateAngle < 274) {
        rotateAngle = 270;
      }

      _this.props.onRotate(rotateAngle);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResize", function (length, alpha, rect, type, isShiftKey) {
      if (!_this.props.onResize) return;
      var _this$props = _this.props,
          rotateAngle = _this$props.rotateAngle,
          aspectRatio = _this$props.aspectRatio,
          minWidth = _this$props.minWidth,
          minHeight = _this$props.minHeight,
          parentRotateAngle = _this$props.parentRotateAngle;
      var beta = alpha - degToRadian(rotateAngle + parentRotateAngle);
      var deltaW = length * Math.cos(beta);
      var deltaH = length * Math.sin(beta);
      var ratio = isShiftKey && !aspectRatio ? rect.width / rect.height : aspectRatio;

      var _getNewStyle = getNewStyle(type, _objectSpread({}, rect, {
        rotateAngle: rotateAngle
      }), deltaW, deltaH, ratio, minWidth, minHeight),
          _getNewStyle$position = _getNewStyle.position,
          centerX = _getNewStyle$position.centerX,
          centerY = _getNewStyle$position.centerY,
          _getNewStyle$size = _getNewStyle.size,
          width = _getNewStyle$size.width,
          height = _getNewStyle$size.height;

      _this.props.onResize(centerToTL({
        centerX: centerX,
        centerY: centerY,
        width: width,
        height: height,
        rotateAngle: rotateAngle
      }), isShiftKey, type);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDrag", function (deltaX, deltaY) {
      _this.props.onDrag && _this.props.onDrag(deltaX, deltaY);
    });

    return _this;
  }

  _createClass(ResizableRect, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          top = _this$props2.top,
          left = _this$props2.left,
          width = _this$props2.width,
          height = _this$props2.height,
          rotateAngle = _this$props2.rotateAngle,
          parentRotateAngle = _this$props2.parentRotateAngle,
          zoomable = _this$props2.zoomable,
          rotatable = _this$props2.rotatable,
          onRotate = _this$props2.onRotate,
          onResizeStart = _this$props2.onResizeStart,
          onResizeEnd = _this$props2.onResizeEnd,
          onRotateStart = _this$props2.onRotateStart,
          onRotateEnd = _this$props2.onRotateEnd,
          onDragStart = _this$props2.onDragStart,
          onDragEnd = _this$props2.onDragEnd;
      var styles = tLToCenter({
        top: top,
        left: left,
        width: width,
        height: height,
        rotateAngle: rotateAngle
      });
      return React__default.createElement(Rect, {
        styles: styles,
        zoomable: zoomable,
        rotatable: Boolean(rotatable && onRotate),
        parentRotateAngle: parentRotateAngle,
        onResizeStart: onResizeStart,
        onResize: this.handleResize,
        onResizeEnd: onResizeEnd,
        onRotateStart: onRotateStart,
        onRotate: this.handleRotate,
        onRotateEnd: onRotateEnd,
        onDragStart: onDragStart,
        onDrag: this.handleDrag,
        onDragEnd: onDragEnd
      });
    }
  }]);

  return ResizableRect;
}(React.Component);

_defineProperty(ResizableRect, "propTypes", {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotatable: PropTypes.bool,
  rotateAngle: PropTypes.number,
  parentRotateAngle: PropTypes.number,
  zoomable: PropTypes.string,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  aspectRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  onRotateStart: PropTypes.func,
  onRotate: PropTypes.func,
  onRotateEnd: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
});

_defineProperty(ResizableRect, "defaultProps", {
  parentRotateAngle: 0,
  rotateAngle: 0,
  rotatable: true,
  zoomable: '',
  minWidth: 10,
  minHeight: 10
});

module.exports = ResizableRect;
//# sourceMappingURL=index.js.map
