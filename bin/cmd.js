#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
const existSync = require("exists-sync");
const echo = function (message) {
    console.info(message);
};
const exec = function (command) {
    echo("Run: " + command);
    if (shelljs.exec(command).code !== 0) {
        throw new Error("Fail:" + command);
    }
};
// exist config files
const babelrcPath = path.join(process.cwd(), ".babelrc");
const existBabelRC = existSync(babelrcPath);
const mochaOptPath = path.join(process.cwd(), "test", "mocha.opts");
if (!existSync(mochaOptPath)) {
    throw new Error("Not found mocha.opts file in test/ dir");
}
// read files
const babelrc = existBabelRC ? JSON.parse(fs.readFileSync(babelrcPath, "utf-8")) : {};
const mochaOpt = fs.readFileSync(mochaOptPath, "utf-8");
// install devDependencies
exec('npm uninstall --save-dev espower-babel');
exec('npm install --save-dev power-assert');
exec('npm install --save-dev babel-preset-power-assert');
exec('npm install --save-dev babel-register');
// replace exist config
/**
 * @param {string} mochaOptsContent
 * @returns {string}
 */
function replaceEspowerBabelToBabelRegister(mochaOptsContent) {
    return mochaOptsContent.replace(/--compilers (.*?):espower-babel\/guess/, "--compilers $1:babel-register");
}
/**
 * replace babelrc object
 * @param {Object}babelrc
 * @returns {Object}
 */
function addBabelPluginEspower(babelrc) {
    const env = babelrc["env"] || {};
    const development = env["development"] || {};
    const presets = development["presets"] || [];
    if (presets.indexOf('babel-preset-power-assert') === -1 || presets.indexOf('power-assert') === -1) {
        presets.push('power-assert');
    }
    development["presets"] = presets;
    env["development"] = development;
    babelrc["env"] = env;
    return babelrc;
}

const replacedMochaOpts = replaceEspowerBabelToBabelRegister(mochaOpt);
const replacedBabelrc = addBabelPluginEspower(babelrc);
echo("rewrite mocha.opts");
fs.writeFileSync(mochaOptPath, replacedMochaOpts);
echo("rewrite .babelrc");
fs.writeFileSync(babelrcPath, JSON.stringify(replacedBabelrc, null, 2));