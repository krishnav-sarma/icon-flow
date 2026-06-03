import IconCard from "@/components/icon-card";

import { registry } from "@/lib/registry";
import { iconMap } from "@/lib/icon-map";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="mb-4 text-center text-7xl font-bold">
          Beautifully crafted
          <br />
          animated icons
        </h1>

        <p className="mx-auto mb-16 max-w-xl text-center text-zinc-400">
          Open-source animated icons built with Motion.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {registry.map((icon) => {
            const Icon =
              iconMap[icon.name as keyof typeof iconMap];

            return (
              <IconCard
                key={icon.name}
                title={icon.title}
                command={icon.command}
                code={icon.code}
              >
                <Icon />
              </IconCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}