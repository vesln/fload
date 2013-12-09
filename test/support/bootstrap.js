/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Register `expect`.
 */

global.expect = chai.expect;

/**
 * `fload`.
 */

global.fload = require('../../');

/**
 * Do not show diffs.
 */

chai.Assertion.showDiff = false;

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;
