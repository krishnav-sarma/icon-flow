import { REGISTRY_URL } from "../config";

export async function getRegistry() {
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