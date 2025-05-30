"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _countFile = _interopRequireDefault(require("../../controller/count-file.controller"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.get('/', _countFile["default"].search);
router.get('/download/:filepath', _countFile["default"].download);
router.get('/:id', _countFile["default"].get);
var _default = exports["default"] = router;