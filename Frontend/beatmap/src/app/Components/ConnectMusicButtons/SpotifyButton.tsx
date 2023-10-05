import { useEffect } from "react";
function stringifyParams(queryParams: any): string {
  const stringParams = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return stringParams;
}
function SpotifyButton(params: any) {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;
  const scope = "user-top-read user-read-recently-played";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const form = {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      };

      const encoded_client_info = btoa(`${client_id}:${client_secret}`);

      fetch(`https://accounts.spotify.com/api/token`, {
        method: "post",
        headers: {
          Authorization: `Basic ${encoded_client_info}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: stringifyParams(form),
      })
        .then((res) => res.json())
        .then((res) => console.log("res :>> ", res));

      // Optionally, you can clear the query parameters from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [client_id, client_secret, redirect_uri]);

  function handleConnect(params: any) {
    const queryParams = {
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    };
    const stringParams = stringifyParams(queryParams);
    const authUrl = `https://accounts.spotify.com/authorize?${stringParams}`;

    window.location.href = authUrl;
  }
  return (
    <div>
      <button
        type="button"
        className="my-5 text-gray-900 bg-[#1DB954] hover:bg-[#1DB954]/90 focus:ring-4 focus:outline-none focus:ring-[#1DB954]/50  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1DB954]/50 mr-2 mb-2"
        onClick={handleConnect}
      >
        Connect to spotify
      </button>
    </div>
  );
}
export default SpotifyButton;
