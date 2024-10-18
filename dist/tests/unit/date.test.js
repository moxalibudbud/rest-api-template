"use strict";

var _globals = require("@jest/globals");
var _date = _interopRequireDefault(require("../../utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _globals.test)('Test date helper', function () {
  var year = (0, _date["default"])('2024', 'YYYY').format('YYYY');
  (0, _globals.expect)(year).toBe('2024');
});