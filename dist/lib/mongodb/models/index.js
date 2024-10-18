"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _models = require("@app/core/mongodb/models");
Object.keys(_models).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _models[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _models[key];
    }
  });
});