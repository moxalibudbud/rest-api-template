"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _https = _interopRequireDefault(require("https"));
var _http = _interopRequireDefault(require("http"));
var _fs = _interopRequireDefault(require("fs"));
var _crypto = _interopRequireDefault(require("crypto"));
var _config = require("../config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var port = _config.WEBSERVER_PORT;
var credentials = {
  key: process.env.APP_SSLKEY || '',
  certificate: process.env.APP_SSLCRT || '',
  bundle: process.env.APP_SSLCA || ''
};
function createServer(app) {
  if (credentials.key) {
    var options = {
      key: _fs["default"].readFileSync(credentials.key),
      cert: _fs["default"].readFileSync(credentials.certificate),
      ca: _fs["default"].readFileSync(credentials.bundle),
      secureOptions: _crypto["default"].constants.SSL_OP_NO_TLSv1 | _crypto["default"].constants.SSL_OP_NO_TLSv1_1
    };
    return _https["default"].createServer(options, app);
  }
  return _http["default"].createServer(app);
}
var _default = exports["default"] = function _default(app) {
  var server = createServer(app);
  server.listen(port, function () {
    console.info("Listening to port ".concat(port));
  });
};