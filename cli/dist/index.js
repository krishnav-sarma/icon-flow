#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/config.ts
var REGISTRY_URL = process.env.REGISTRY_URL || "http://localhost:3000";

// src/utils/fetch-registry.ts
async function getRegistry() {
  const response = await fetch(
    `${REGISTRY_URL}/api/registry`
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
import fs from "fs";
import path from "path";
function copyIcon(source, iconName) {
  const targetDir = path.resolve(
    process.cwd(),
    "src",
    "components",
    "icons"
  );
  fs.mkdirSync(targetDir, {
    recursive: true
  });
  const targetFile = path.join(
    targetDir,
    `${iconName}.tsx`
  );
  fs.writeFileSync(
    targetFile,
    source,
    "utf-8"
  );
  return targetFile;
}

// src/utils/install-deps.ts
import { execSync } from "child_process";
function installDependencies(deps) {
  if (!deps.length) return;
  const command = `npm install ${deps.join(" ")}`;
  execSync(command, {
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
    `${REGISTRY_URL}${icon.file}`
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
var program = new Command();
program.name("krishnav-icons").description("Animated icon registry");
program.command("add").argument("<icon>").action(addIcon);
program.parse();
