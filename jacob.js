/**
 * Created by mqli on 2014/10/30.
 */

(function () {
    var jacob = function () {};
    var isArray = Array.isArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };
    var _cache = {};

    jacob.define = function (name, format) {
        _cache[name] = function () {

        };
        return _cache;
    };
})()