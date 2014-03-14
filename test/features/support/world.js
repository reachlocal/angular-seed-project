/*global assert:true,expect:true,expectCallback:true,_:true*/
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var underscore = require('underscore');
chai.use(chaiAsPromised);

var World = (function () {
    function World(callback) {
        // We're going to put some very useful stuff in global scope
        // because it'll be super-helpful
        assert = chai.assert;
        expect = chai.expect;
        _ = underscore;

        callback();
    }

    return World;

}());

module.exports.World = World;
