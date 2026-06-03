import fs from "fs";
import path from "path";

function toPascalCase(str) {
  return str
    .split("-")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join("");
}

function camelCase(str) {
  const pascal =
    toPascalCase(str);

  return (
    pascal.charAt(0).toLowerCase() +
    pascal.slice(1)
  );
}

const registryDir = path.join(
  process.cwd(),
  "registry"
);

const publicDir = path.join(
  process.cwd(),
  "public",
  "registry"
);

fs.mkdirSync(publicDir, {
  recursive: true,
});

const registry = {};

const icons = fs.readdirSync(registryDir);

for (const icon of icons) {
  const componentPath = path.join(
    registryDir,
    icon,
    "component.tsx"
  );

  if (!fs.existsSync(componentPath))
    continue;

  fs.copyFileSync(
    componentPath,
    path.join(
      publicDir,
      `${icon}.tsx`
    )
  );

  registry[icon] = {
    name: icon,
    dependencies: ["motion"],
    file: `/registry/${icon}.tsx`,
  };

  console.log(
    `✓ Synced ${icon}`
  );
}

fs.writeFileSync(
  "registry.json",
  JSON.stringify(
    registry,
    null,
    2
  )
);

console.log(
  "\nregistry.json updated"
);

const iconImports = [];
const iconEntries = [];

for (const icon of icons) {
  iconImports.push(
    `import ${toPascalCase(icon)} from "@/../registry/${icon}/component";`
  );

  iconEntries.push(
    `  "${icon}": ${toPascalCase(icon)},`
  );
}

const iconMapContent = `${iconImports.join("\n")}

export const iconMap = {
${iconEntries.join("\n")}
};
`;

fs.writeFileSync(
  path.join(
    process.cwd(),
    "src",
    "lib",
    "icon-map.ts"
  ),
  iconMapContent
);

const metaImports = [];
const registryEntries = [];

for (const icon of icons) {
  metaImports.push(
    `import { metadata as ${camelCase(icon)} } from "@/../registry/${icon}/meta";`
  );

  registryEntries.push(
    `  ${camelCase(icon)},`
  );
}

const registryContent = `${metaImports.join("\n")}

export const registry = [
${registryEntries.join("\n")}
];
`;

fs.writeFileSync(
  path.join(
    process.cwd(),
    "src",
    "lib",
    "registry.ts"
  ),
  registryContent
);