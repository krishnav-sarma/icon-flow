import fs from "fs";
import path from "path";

export function copyIcon(
  source: string,
  iconName: string
) {
  const targetDir = path.resolve(
    process.cwd(),
    "src",
    "components",
    "icons"
  );

  fs.mkdirSync(targetDir, {
    recursive: true,
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