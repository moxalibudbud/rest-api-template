"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var router = (0, _express.Router)();
router.get('/', function (req, res) {
  return res.send('Hello World!');
});
var _default = exports["default"] = router;