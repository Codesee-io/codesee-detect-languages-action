const core = require("@actions/core");
const exec = require("@actions/exec");

async function runCodeseeDetectLanguages() {
  const execOptions = {
    listeners: {
      stdout: (data) => {
        core.setOutput('languages', data.toString()); 
      }
    }
  };

  const args = ["codesee", "detect-languages"];
  const runExitCode = await exec.exec("npx", args, execOptions);

  return runExitCode;
}

async function main() {
  await core.group("Detect Languages", async () => runCodeseeDetectLanguages());
}

main()
  .then(() => {})
  .catch((err) => {
    core.info(`CodeSee Detect Languages failed: ${err}
    ${err.stack}`);
  });
