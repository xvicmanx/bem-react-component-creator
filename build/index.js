'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['b: ', ' m: ', ''], ['b: ', ' m: ', '']),
    _templateObject2 = _taggedTemplateLiteral(['b: ', ' e: ', ' m: ', ''], ['b: ', ' e: ', ' m: ', '']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var combine = function combine(strings) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    var content = '';
    var len = Math.max(strings.length, values.length);
    for (var i = 0; i < len; i++) {
        content += strings[i] || '';
        content += values[i] || '';
    }
    return content;
};

var parseTemplate = function parseTemplate(text) {
    var parts = text.match(/\s*\S+?\s*:\s*\S+\s*/g);
    return parts.reduce(function (acc, part) {
        var result = part.match(/\s*(\S+)?\s*:\s*(\S+)\s*/);
        acc[result[1]] = result[2];
        return acc;
    }, {});
};

var bemClass = function bemClass(_ref) {
    var b = _ref.b,
        e = _ref.e,
        m = _ref.m;

    var main = e ? b + '__' + e : b;
    var result = main;
    m.forEach(function (i) {
        result += i ? ' ' + main + '--' + i : '';
    });
    return result;
};

var bem = function bem() {
    var WrappedComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';

    return function () {
        var config = parseTemplate(combine.apply(undefined, arguments));
        return function (props) {
            var modifiers = (props.modifiers || '').split(',');
            var className = bemClass(Object.assign({}, config, {
                m: (config.m || '').split(',').concat(modifiers)
            }));
            var elementClass = props.className ? ' ' + props.className : '';
            var injectProps = Object.assign({}, props);
            delete injectProps.modifiers;
            return _react2.default.createElement(WrappedComponent, _extends({}, injectProps, {
                className: '' + className + elementClass
            }));
        };
    };
};

var BemElementsCreator = function BemElementsCreator(blockName) {
    return {
        block: function block(WrappedComponent) {
            for (var _len2 = arguments.length, modifiers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                modifiers[_key2 - 1] = arguments[_key2];
            }

            return bem(WrappedComponent)(_templateObject, blockName, modifiers.join(','));
        },
        element: function element(WrappedComponent, _element) {
            for (var _len3 = arguments.length, modifiers = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                modifiers[_key3 - 2] = arguments[_key3];
            }

            return bem(WrappedComponent)(_templateObject2, blockName, _element, modifiers.join(','));
        }
    };
};

exports.default = BemElementsCreator;