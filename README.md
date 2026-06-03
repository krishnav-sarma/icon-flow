# Icon Flow

Crafted animated icons for React, powered by Motion.

Install individual icons directly into your project using a single command.

```bash
npx krishnav-icons add animated-arrow
```

---

## Features

- Animated SVG icons built with Motion
- Install individual icons — no bulky icon package
- Copy-paste source code via the website
- Open source, Next.js and React compatible

---

## Requirements

- Node.js 18 or higher
- React 18+
- A Next.js or React project

---

## Installation

Run the CLI command inside your project directory:

```bash
npx krishnav-icons add animated-arrow
```

The CLI will:

1. Download the icon source from the registry
2. Install required dependencies (`motion`)
3. Create the component in your project

Generated file:

```
src/
└── components/
    └── icons/
        └── animated-arrow.tsx
```

---

## Usage

```tsx
import AnimatedArrow from "@/components/icons/animated-arrow";

export default function Demo() {
  return <AnimatedArrow />;
}
```

---

## Development

Clone the repository:

```bash
git clone git@github.com:krishnav-sarma/icon-flow.git
cd icon-flow
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Creating New Icons

Generate a new icon scaffold:

```bash
npm run create-icon animated-user
```

This creates the following structure:

```
registry/
└── animated-user/
    ├── component.tsx   ← Build your animation here
    ├── source.ts
    └── meta.ts
```

---

## Syncing the Registry

After creating or updating icons, run:

```bash
npm run sync-icons
```

This automatically updates:

```
registry.json
public/registry/
src/lib/icon-map.ts
src/lib/registry.ts
```

---

## Registry Structure

```
registry/
├── animated-arrow/
│   ├── component.tsx
│   ├── source.ts
│   └── meta.ts
│
├── animated-heart/
│   ├── component.tsx
│   ├── source.ts
│   └── meta.ts
│
└── animated-mail/
    ├── component.tsx
    ├── source.ts
    └── meta.ts
```

---

## CLI Development

Build the CLI:

```bash
cd cli
npm run build
```

Link it locally for testing:

```bash
npm link
```

Run the local build:

```bash
krishnav-icons add animated-arrow
```

> **Note:** `npx krishnav-icons` fetches the published package from npm. `krishnav-icons` (without npx) uses your locally linked build for development testing.

---

## Deployment

Deploy the Next.js website to Vercel:

1. Push to your GitHub repository
2. Import the project at [vercel.com](https://vercel.com)
3. Set the root directory to `/` (default)
4. Deploy — no additional environment variables required

The CLI fetches icon metadata from:

```
/api/registry
```

And downloads source files from:

```
/public/registry
```

---

## Tech Stack

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Motion](https://motion.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Commander](https://github.com/tj/commander.js)
- Node.js

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new icon (`npm run create-icon your-icon-name`)
3. Run `npm run sync-icons`
4. Commit your changes
5. Open a pull request

Please make sure your icon includes a `meta.ts` with a name, description, and preview before submitting.
