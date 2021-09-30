/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 86:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 636:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 225:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(86);
const exec = __nccwpck_require__(636);
const fs = __nccwpck_require__(225);

async function runCodeseeDetectLanguages() {
  const execOptions = {
    listeners: {
      stdout: (data) => {
        core.setOutput("languages", data.toString());
      },
    },
  };

  const args = ["codesee", "detect-languages"];
  const runExitCode = await exec.exec("npx", args, execOptions);

  return runExitCode;
}

async function removeNpmrc() {
  try {
    if (await fs.access(".npmrc")) {
      core.info("Found .npmrc, deleting from working tree");
      try {
        fs.unlink(".npmrc");
      } catch (e) {
        core.error(
          `.npmrc exists, but we couldn't remove it.\nThis may result in map language detection failing: ${e.message}`
        );
      }
    }
  } catch (e) {
    core.warn(`Unable to determine if .npmrc exists: ${e.message}`);
  }
}

async function main() {
  await core.group("Removing .npmrc if exists", removeNpmrc);
  await core.group("Detect Languages", async () => runCodeseeDetectLanguages());
}

main()
  .then(() => {})
  .catch((err) => {
    core.info(`CodeSee Detect Languages failed: ${err}
    ${err.stack}`);
  });

})();

module.exports = __webpack_exports__;
/******/ })()
;