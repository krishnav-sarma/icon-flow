import fs from "fs";
import path from "path";

const name = process.argv[2];

if (!name) {
  console.error(
    "Usage: npm run create-icon animated-mail"
  );
  process.exit(1);
}

const iconDir = path.join(
  process.cwd(),
  "registry",
  name
);

if (fs.existsSync(iconDir)) {
  console.error(
    `${name} already exists`
  );
  process.exit(1);
}

fs.mkdirSync(iconDir, {
  recursive: true,
});

const componentName = name
  .split("-")
  .map(
    (part) =>
      part.charAt(0).toUpperCase() +
      part.slice(1)
  )
  .join("");

const title = name
  .split("-")
  .map(
    (part) =>
      part.charAt(0).toUpperCase() +
      part.slice(1)
  )
  .join(" ");

const componentTemplate = `"use client";

export default function ${componentName}() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
    </svg>
  );
}
`;

const sourceTemplate = `export const source = \`
"use client";

export default function ${componentName}() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
    </svg>
  );
}
\`;
`;

const metaTemplate = `import { source } from "./source";

export const metadata = {
  name: "${name}",
  title: "${title}",

  command: "npx krishnav-icons add ${name}",

  code: source,

  tags: [],
};
`;

fs.writeFileSync(
  path.join(iconDir, "component.tsx"),
  componentTemplate
);

fs.writeFileSync(
  path.join(iconDir, "source.ts"),
  sourceTemplate
);

fs.writeFileSync(
  path.join(iconDir, "meta.ts"),
  metaTemplate
);

console.log(
  `Created ${name}`
);