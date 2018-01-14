"use strict";

// import * as mocha from 'mocha';
// import * as Chai from 'chai';
// import * as td from 'testdouble';

let Chai = require('chai');
let td = require('testdouble');

const supertest = require('supertest');

const _request = supertest;
const _expect = Chai.expect;
const _testDouble = td;

//export { expect, request, testDouble };
module.exports = {
    request: _request,
    expect: _expect,
    testDouble: _testDouble
};