"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MONGODB_USERNAME = exports.MONGODB_PASSWORD = exports.MONGODB_HOST = exports.MONGODB_CONNECTION_STRING = void 0;
var MONGODB_HOST = exports.MONGODB_HOST = process.env.APP_MONGODB_HOST;
var MONGODB_PASSWORD = exports.MONGODB_PASSWORD = process.env.APP_MONGODB_PASSWORD;
var MONGODB_USERNAME = exports.MONGODB_USERNAME = process.env.APP_MONGODB_USERNAME;
var MONGODB_CONNECTION_STRING = exports.MONGODB_CONNECTION_STRING = process.env.APP_MONGODB_CONNECTION_STRING;