# migrate-espower-babel-to-babel-preset-power-assert

Migrate [espower-babel](https://github.com/power-assert-js/espower-babel "espower-babel") to [babel-preset-power-assert](https://github.com/power-assert-js/babel-preset-power-assert "babel-preset-power-assert").

## Target User

- Using `espower-babel`
- Having `test/mocha.opts`
- Using Babel >= 6

## Installation

    npm install -g migrate-espower-babel-to-babel-preset-power-assert

## Usage

```sh
$ cd project-root-dir/
$ migrate-espower-babel-to-babel-preset-power-assert

Run: npm uninstall -D espower-babel
Run: npm install -D power-assert
Run: npm install -D babel-preset-power-assert
Run: npm install -D babel-register
rewrite mocha.opts
rewrite .babelrc
```

### Before

- using espower-babel

### After

- using babel-register
- using babel-preset-power-assert

## Example

```diff
diff --git a/.babelrc b/.babelrc
index ba2a650..e7e1682 100644
--- a/.babelrc
+++ b/.babelrc
@@ -6,6 +6,9 @@
     "development": {
       "plugins": [
         "jsdoc-to-assert"
+      ],
+      "presets": [
+        "power-assert"
       ]
     }
   }
diff --git a/package.json b/package.json
index ebafaf5..e5e1216 100644
--- a/package.json
+++ b/package.json
@@ -24,7 +24,8 @@
     "babel-plugin-add-module-exports": "^0.1.2",
     "babel-plugin-jsdoc-to-assert": "^1.4.0",
     "babel-preset-es2015": "^6.6.0",
-    "espower-babel": "^4.0.1",
+    "babel-preset-power-assert": "^1.0.0",
+    "babel-register": "^6.7.2",
     "espower-loader": "^1.0.0",
     "mocha": "^2.2.1",
     "power-assert": "^1.0.0",
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

- [chore(npm): use babel-preset-power-assert by azu · Pull Request #25 · azu/material-flux](https://github.com/azu/material-flux/pull/25 "chore(npm): use babel-preset-power-assert by azu · Pull Request #25 · azu/material-flux")
- [chore(test): use power-assert preset · azu/match-index@f4f6df8](https://github.com/azu/match-index/commit/f4f6df88ae39a2eb8eab0a13e121f27305085aa3 "chore(test): use power-assert preset · azu/match-index@f4f6df8")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT