"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _compression = _interopRequireDefault(require("compression"));
var _cors = _interopRequireDefault(require("cors"));
var _v = _interopRequireDefault(require("./routes/v1"));
var _httpServer = _interopRequireDefault(require("./utils/http-server"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();

// set security HTTP headers
app.use((0, _helmet["default"])());

// parse json request body
app.use(_express["default"].json());

// parse urlencoded request body
app.use(_express["default"].urlencoded({
  extended: true
}));

// sanitize request data
// TODO: Middlewares for sanitazion here

// gzip compression
app.use((0, _compression["default"])());

// enable cors
app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])());

// jwt authentication
// TODO: For passport implementation here
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', _v["default"]);
var _default = exports["default"] = function _default() {
  (0, _httpServer["default"])(app);
};