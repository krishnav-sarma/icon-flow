export async function downloadIcon(
    url: string
  ) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(
        `Failed to download icon: ${response.status}`
      );
    }
  
    return await response.text();
  }