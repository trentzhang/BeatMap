export const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
export const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
export const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;

export async function spotifyCode2Token(currentSpotifyCode: string) {
  var res = { access_token: "" };

  if (currentSpotifyCode) {
    const form = {
      code: currentSpotifyCode,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    };

    const encoded_client_info = btoa(`${client_id}:${client_secret}`);

    res = await fetch(`https://accounts.spotify.com/api/token`, {
      method: "post",
      headers: {
        Authorization: `Basic ${encoded_client_info}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stringifyParams(form),
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((e) => console.log("e :>> ", e));
    // console.log("spotifyToken :>> ", spotifyToken);
  }
  return res;
}
export function stringifyParams(queryParams: any): string {
  const stringParams = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return stringParams;
}
