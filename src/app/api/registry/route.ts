import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    "animated-arrow": {
      name: "animated-arrow",
      dependencies: ["motion"],
      file: "/registry/animated-arrow.tsx",
    },

    "animated-heart": {
      name: "animated-heart",
      dependencies: ["motion"],
      file: "/registry/animated-heart.tsx",
    },
  });
}