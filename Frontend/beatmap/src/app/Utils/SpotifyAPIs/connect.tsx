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
      console.log(
        `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`
      );
      //   throw new Error(
      //     `HTTP error!  ${{ Status: response.status, Response: response.body }}`
      //   );
    }

    const data = await response.json();
    if (data.error) {
      console.log("data :>> ", {
        url: `https://api.spotify.com/${endpoint}`,
        res: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return data;
  } catch (error) {
    console.error("Error in fetchWebApi:", error);
    console.log({
      "fetchWebApi link:": `https://api.spotify.com/${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: method,
    });
    throw error;
  }
}
