const { spawn } = require("child_process");

// Run node with experimental VM modules flag
const child = spawn(
  "node",
  [
    "--experimental-vm-modules",
    "./node_modules/jest/bin/jest.js",
    "--detectOpenHandles",
    "--forceExit",
  ],
  {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "test" },
  }
);

child.on("error", (error) => {
  console.error(`Error executing tests: ${error.message}`);
  process.exit(1);
});

child.on("close", (code) => {
  process.exit(code);
});
