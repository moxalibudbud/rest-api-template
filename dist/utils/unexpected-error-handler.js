"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unexpectedErrorHandler = void 0;
var unexpectedErrorHandler = exports.unexpectedErrorHandler = function unexpectedErrorHandler(error, event) {
  console.error("=== ".concat(event, " ==="));
  console.error(error);
  // exitHandler({ event });
};