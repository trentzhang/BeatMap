import { getTopTracks } from "@/app/SpotifyAPIs/getTopTracks";

import { SpotifyCard } from "./TrackCard";

export default async function MusicComponent({
  spotifyToken,
}: {
  spotifyToken: string;
}) {
  const topTracks = await getTopTracks(spotifyToken);
  //   const track = topTracks[0];
  return (
    <div className="grid place-items-center min-h-screen  p-5">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-200 mb-5">
        Your Top 50 Songs
      </h1>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {topTracks?.map(
          ({
            name,
            artists,
            album,
            preview_url,
          }: {
            name: string;
            artists: [{ name: string }];
            album: { images: [{ url: string }] };
            preview_url: string;
          }) => (
            <SpotifyCard
              key={name}
              title={name}
              artist={artists.map((artist) => artist.name).join(", ")}
              coverLink={album.images?.[0].url}
              preview_url={preview_url}
            ></SpotifyCard>
          )
        )}
      </section>
    </div>
  );
}
