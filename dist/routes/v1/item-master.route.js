"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _itemMaster = _interopRequireDefault(require("../../controller/item-master.controller"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.get('/', _itemMaster["default"].search);
router.get('/download/:filepath', _itemMaster["default"].download);
router.get('/:id', _itemMaster["default"].get);
var _default = exports["default"] = router;