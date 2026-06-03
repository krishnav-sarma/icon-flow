import { getRegistry } from "../utils/fetch-registry";
import { downloadIcon } from "../utils/download-icon";
import { copyIcon } from "../utils/copy-file";
import { installDependencies } from "../utils/install-deps";
import { RegistryIcon } from "../types";
import { REGISTRY_URL } from "../config";

export async function addIcon(
  iconName: string
) {
  const registry = await getRegistry();

  const icon =
    registry[iconName] as RegistryIcon;

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