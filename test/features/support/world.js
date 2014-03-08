/*global assert:true,expect:true,expectCallback:true,_:true*/
var path = require('path');
var asserts = require('./assert');
var underscore = require('underscore');

var World = (function () {
    function World(callback) {
        // We're going to put some very useful stuff in global scope
        // because it'll be super-helpful
        assert = asserts.assert;
        expect = asserts.expect;
        expectCallback = asserts.expectCallback;

        _ = underscore;
        callback();
    }

    return World;

}());

module.exports.World = World;
