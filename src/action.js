const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs").promises;

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
    await fs.access(".npmrc");

    core.info("Found .npmrc, deleting from working tree");
    try {
      await fs.unlink(".npmrc");
    } catch (e) {
      core.error(
        `.npmrc exists, but we couldn't remove it.\nThis may result in language detection failing: ${e.message}`
      );
    }
  } catch (e) {
    // Didn't find the .npmrc, so do nothing.
  }
}

async function main() {
  await core.group("Removing .npmrc if exists", removeNpmrc);
  await core.group("Detect Languages", runCodeseeDetectLanguages);
}

main()
  .then(() => {})
  .catch((err) => {
    core.info(`CodeSee Detect Languages failed: ${err}
    ${err.stack}`);
  });
