import { execSync } from "child_process";

export function installDependencies(
  deps: string[]
) {
  if (!deps.length) return;

  const command =
    `npm install ${deps.join(" ")}`;

  execSync(command, {
    stdio: "inherit",
  });
}