"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _hello = _interopRequireDefault(require("./hello"));
var _itemMaster = _interopRequireDefault(require("./item-master.route"));
var _countFile = _interopRequireDefault(require("./count-file.route"));
var _soh = _interopRequireDefault(require("./soh.route"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.use('/hello', _hello["default"]);
router.use('/item-master', _itemMaster["default"]);
router.use('/count-file', _countFile["default"]);
router.use('/soh', _soh["default"]);
var _default = exports["default"] = router;