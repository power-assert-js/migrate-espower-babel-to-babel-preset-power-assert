# migrate-espower-babel-to-babel-plugin-espower

Migrate [espower-babel](https://github.com/power-assert-js/espower-babel "espower-babel") to [babel-plugin-espower](https://github.com/power-assert-js/babel-plugin-espower "babel-plugin-espower").

## Installation

    npm install -g migrate-espower-babel-to-babel-plugin-espower

## Usage

```sh
$ migrate-espower-babel-to-babel-plugin-espower

Run: npm uninstall -D espower-babel
Run: npm install -D babel-plugin-espower
Run: npm install -D babel-register
rewrite mocha.opts
rewrite .babelrc
```

## Example

```diff
diff --git a/.babelrc b/.babelrc
index 7e841ee..ce17a67 100644
--- a/.babelrc
+++ b/.babelrc
@@ -1,4 +1,15 @@
 {
-    "presets": ["es2015"],
-    "plugins": ["add-module-exports"]
+  "presets": [
+    "es2015"
+  ],
+  "plugins": [
+    "add-module-exports"
+  ],
+  "env": {
+    "development": {
+      "plugins": [
+        "babel-plugin-espower"
+      ]
+    }
+  }
 }
\ No newline at end of file
diff --git a/package.json b/package.json
index 7532cda..ba7ebbb 100644
--- a/package.json
+++ b/package.json
@@ -26,7 +26,7 @@
     "test": "test"
   },
   "scripts": {
-    "build": "babel src --out-dir lib --source-maps",
+    "build": "NODE_ENV=production babel src --out-dir lib --source-maps",
     "watch": "babel src --out-dir lib --watch --source-maps",
     "prepublish": "npm run --if-present build",
     "test": "mocha"
@@ -38,8 +38,9 @@
   "devDependencies": {
     "babel-cli": "^6.4.0",
     "babel-plugin-add-module-exports": "^0.1.3-alpha",
+    "babel-plugin-espower": "^2.1.2",
     "babel-preset-es2015": "^6.3.13",
-    "espower-babel": "^4.0.1",
+    "babel-register": "^6.7.2",
     "mocha": "^2.3.4",
     "power-assert": "^1.2.0"
   },
diff --git a/test/mocha.opts b/test/mocha.opts
index 8d0282d..b76d223 100644
--- a/test/mocha.opts
+++ b/test/mocha.opts
@@ -1 +1 @@
---compilers js:espower-babel/guess
\ No newline at end of file
+--compilers js:babel-register
\ No newline at end of file
```

See real commit:

- [chore(test): use babel-plugin-espower directly by azu · Pull Request #1 · azu/es-usage-rate](https://github.com/azu/es-usage-rate/pull/1/commits/e581cd5f2b87204aff889bc7c4db8b419d799922 "chore(test): use babel-plugin-espower directly by azu · Pull Request #1 · azu/es-usage-rate")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT