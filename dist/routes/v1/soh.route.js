"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _soh = _interopRequireDefault(require("../../controller/soh.controller"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.get('/', _soh["default"].search);
router.get('/download/:filepath', _soh["default"].download);
router.get('/:id', _soh["default"].get);
var _default = exports["default"] = router;