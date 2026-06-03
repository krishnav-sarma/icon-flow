#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");

// src/utils/fetch-registry.ts
async function getRegistry() {
  const response = await fetch(
    "http://localhost:3000/api/registry"
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch registry: ${response.status}`
    );
  }
  return await response.json();
}

// src/utils/download-icon.ts
async function downloadIcon(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to download icon: ${response.status}`
    );
  }
  return await response.text();
}

// src/utils/copy-file.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
function copyIcon(source, iconName) {
  const targetDir = import_path.default.resolve(
    process.cwd(),
    "..",
    "src",
    "components",
    "icons"
  );
  import_fs.default.mkdirSync(targetDir, {
    recursive: true
  });
  const targetFile = import_path.default.join(
    targetDir,
    `${iconName}.tsx`
  );
  import_fs.default.writeFileSync(
    targetFile,
    source,
    "utf-8"
  );
  return targetFile;
}

// src/utils/install-deps.ts
var import_child_process = require("child_process");
function installDependencies(deps) {
  if (!deps.length) return;
  const command = `npm install ${deps.join(" ")}`;
  (0, import_child_process.execSync)(command, {
    stdio: "inherit"
  });
}

// src/commands/add.ts
async function addIcon(iconName) {
  const registry = await getRegistry();
  const icon = registry[iconName];
  if (!icon) {
    console.error(
      `Icon "${iconName}" not found`
    );
    process.exit(1);
  }
  console.log(
    `Installing ${icon.name} .`
  );
  installDependencies(
    icon.dependencies
  );
  if (!icon.file) {
    throw new Error(
      `Registry entry for "${iconName}" is missing 'file'`
    );
  }
  const source = await downloadIcon(
    `http://localhost:3000${icon.file}`
  );
  copyIcon(
    source,
    icon.name
  );
  console.log(
    `Added ${icon.name}.tsx .`
  );
}

// src/index.ts
var program = new import_commander.Command();
program.name("krishnav-icons").description("Animated icon registry");
program.command("add").argument("<icon>").action(addIcon);
program.parse();
