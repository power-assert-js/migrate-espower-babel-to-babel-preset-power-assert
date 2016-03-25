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

const babelrcPath = path.join(process.cwd(), ".babelrc");
if (!existSync(babelrcPath)) {
    throw new Error("Not found .babelrc file");
}
const mochaOptPath = path.join(process.cwd(), "test", "mocha.opts");
if (!existSync(mochaOptPath)) {
    throw new Error("Not found mocha.opts file in test/ dir");
}

// read file
const babelrc = JSON.parse(fs.readFileSync(babelrcPath, "utf-8"));
const mochaOpt = fs.readFileSync(mochaOptPath, "utf-8");
// install devDependencies
exec('npm uninstall -D espower-babel');
exec('npm install -D babel-plugin-espower');
exec('npm install -D babel-register');
// replace exist config
/**
 * @param {string} mochaOptsContent
 * @returns {string}
 */
function replaceEspowerBabelToBabelRegister(mochaOptsContent) {
    return mochaOptsContent.replace(/--compilers (.*?):espower-babel\/guess/, "--compilers $1:babel-register");
}
function addBabelPluginEspower(babelrc) {
    const env = babelrc["env"] || {};
    const development = env["development"] || {};
    const plugins = development["plugins"] || [];
    if (plugins.indexOf('babel-plugin-espower') === -1) {
        plugins.push('babel-plugin-espower');
    }
    development["plugins"] = plugins;
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