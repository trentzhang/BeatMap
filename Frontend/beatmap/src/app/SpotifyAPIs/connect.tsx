export const fetchWebApi = async (
  endpoint: string,
  method: string,
  token: any | string
) => {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  });
  return await res.json();
};
