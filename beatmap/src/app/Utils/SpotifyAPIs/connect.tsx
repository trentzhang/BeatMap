export async function fetchWebApi(
  endpoint: string,
  method: string,
  token: string
) {
  try {
    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
    });

    if (!response.ok) {
      const error = response;

      throw error;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    console.error("Error in fetchWebApi:", error);
    console.log({
      "fetchWebApi link:": `https://api.spotify.com/${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: method,
    });
    return { error: { status: error.status, statusText: error.statusText } };
  }
}
