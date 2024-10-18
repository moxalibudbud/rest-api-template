"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_momentTimezone["default"].tz.setDefault(process.env.APP_TIMEZONE);
var _default = exports["default"] = _momentTimezone["default"];