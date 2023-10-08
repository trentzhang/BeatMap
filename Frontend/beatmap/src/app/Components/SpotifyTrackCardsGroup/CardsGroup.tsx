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
    <div className="grid place-items-center min-h-screen  p-5 bg-gradient-to-b from-blue-600 to-slate-500 rounded-lg mx-5">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
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
      {/* Collapse button */}
      <button className="my-3">
        <svg
          className="w-10 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 12"
          preserveAspectRatio="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 7 4 4 4-4M1 1l4 4 4-4"
          />
        </svg>
      </button>
    </div>
  );
}
