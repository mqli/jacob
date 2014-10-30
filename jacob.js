/**
 * Created by mqli on 2014/10/30.
 */

(function () {
    var jacob = function () {};
    var TYPE_LIST = ['Array', 'Function', 'String', 'Number', 'Date', 'RegExp'];
    //utils
    TYPE_LIST.forEach(function(name) {
        jacob['is' + name] = function(obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });
    jacob.isObject = function(obj) {
        var type = typeof obj;
        return type === 'object' && TYPE_LIST.every(function(name) {
            return jacob['is' + name](obj) === false;
        });
    };
    var _cache = {};
    var check_basic = function (obj,format) {
        if (format === String) return jacob.isString(obj);
        if (format === Number) return jacob.isNumber(obj);
        if (format === Array) return jacob.isArray(obj);
        if (format === Object) return jacob.isObject(obj);
    };
    var check = function (obj,format){
        if (jacob.isFunction(format)) {
            return check_basic(obj,format);
        } else if (jacob.isArray(format)){
            if (format.length == 0){
                return jacob.isArray(obj);
            } else if (format.length == 1) {
                return obj.every(function (key) {
                    return check(key, format[0]);
                });
            }
        } else if (jacob.isObject(format)){
            var keys = Object.keys(format);
            if (keys.length == 0) return check_basic(obj, Object);
            return keys.every(function (key) {
                return obj.hasOwnProperty(key) && check(obj[key], format[key]);
            });
        }
    };
    jacob.define = function (name, format) {
        _cache[name] = function (obj) {
            return check(obj,format);
        };
        return _cache[name];
    };

    //export for amd/nodejs/browser
    if (typeof define === 'function' && define.amd) {
        define('jacob', [], function() {
            return jacob;
        });
    } else if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = jacob;
        }
        exports = jacob;
    } else {
        window.jacob = jacob;
    }
})();