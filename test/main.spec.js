var jacob = require('../jacob');
require('chai').should();
var root = (global || this);
var TYPE_LIST = ['Array', 'Function', 'String', 'Number', 'Date', 'RegExp'];
describe('jacob', function () {
    describe('utils', function () {
        TYPE_LIST.forEach(function (type) {
            it('jacob.is' + type + ' should test Type ' + type, function () {
                TYPE_LIST.forEach(function (_type) {
                    jacob['is' + type](new root[_type]()).should.be[type === _type];
                });
            });
        });
    });
    describe('define("string",String)', function () {
        var string_test = jacob.define("string", String);
        it('should return true if given string', function () {
            string_test('').should.be.true;
            string_test('0').should.be.true;
            string_test(new String).should.be.true;
        });
        it('should return false if given not a string', function () {
            string_test(0).should.be.false;
            string_test(1).should.be.false;
            string_test({}).should.be.false;
        });
    });
    describe('define("number",Number)', function () {
        var number_test = jacob.define("number", Number);
        it('should return true if given number', function () {
            number_test(0).should.be.true;
            number_test(1).should.be.true;
            number_test(0.2).should.be.true;
            number_test(new Number).should.be.true;
        });
        it('should return false if given not a number', function () {
            number_test('').should.be.false;
            number_test(/a/).should.be.false;
            number_test({}).should.be.false;
        });
    });
    describe('define("array",Array)', function () {
        var array_test = jacob.define("array", Array);
        it('should return true if given array', function () {
            array_test([]).should.be.true;
            array_test([1]).should.be.true;
            array_test(new Array).should.be.true;
        });
        it('should return false if given not a array', function () {
            array_test('').should.be.false;
            array_test(/a/).should.be.false;
            array_test({}).should.be.false;
        });
    });
    describe('define("object",Object)', function () {
        var object_test = jacob.define("object", Object);
        it('should return true if given object', function () {
            object_test(new Object).should.be.true;
            object_test({}).should.be.true;
        });
        it('should return false if given not a object', function () {
            object_test('').should.be.false;
            object_test(/a/).should.be.false;
            object_test(1).should.be.false;
            object_test([]).should.be.false;
        });
    });
    describe('define("number_array", [Number])', function () {
        var number_array = jacob.define("number_array", [Number]);
        it('should return true if given a array with number', function () {
            number_array([]).should.be.true;
            number_array([1, 2]).should.be.true;
        });
        it('should return false if given not a array with number', function () {
            number_array([1, '2']).should.be.false;
        });
    });
    describe('define("object_value", {"name": String,"age": Number})', function () {
        var object_value = jacob.define("object_value", {"name": String, "age": Number});
        it('should return true if given a object with format', function () {
            object_value({name: '', age: 1}).should.be.true;
        });
        it('should return false if given not a object with format', function () {
            object_value({name: '', age: '2'}).should.be.false;
        });
    });
    describe('define("array_in_object", {"name": String,"tags": []})', function () {
        var object_value = jacob.define("object_value", {"name": String, "tags": [String]});
        it('should return true if given a object with format', function () {
            object_value({name: '', age: 1, tags: ['']}).should.be.true;
        });
        it('should return false if given not a object with format', function () {
            object_value({name: '', age: '2'}).should.be.false;
            object_value({name: '', age: '2', tags: [0]}).should.be.false;
        });
    });
    describe('complicate object', function () {
        doc_validate = jacob.define("doc", {
            "name": String,
            "tags": [String],
            "comments": [String],
            "author": {
                "name": String,
                "github": String
            }
        });
        it('', function () {
            doc_validate({
                "name": "jacob",
                "tags": ["json", "validation"],
                "comments": [],
                "author": {"name": "mqli", "github": "github.com/mqli"}
            }).should.be.true;
            doc_validate({
                "name": "jacob",
                "tags": ["json", "validation"],
                "comments": [1],
                "author": {"name": "mqli", "github": "github.com/mqli"}
            }).should.be.false;
        });
    });
});