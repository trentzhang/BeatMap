export const profileDefault = {
  display_name: "",
  external_urls: {
    spotify: "",
  },
  href: "",
  id: "",
  images: [
    {
      url: "",
      height: 64,
      width: 64,
    },
    {
      url: "",
      height: 300,
      width: 300,
    },
  ],
  type: "user",
  uri: "",
  followers: {
    href: null,
    total: 0,
  },
};
export const topTracksDefault = {
  items: [
    {
      album: {
        album_type: "ALBUM",
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/3mLu6fOzdwzWf2wyfPqdUa",
            },
            href: "https://api.spotify.com/v1/artists/3mLu6fOzdwzWf2wyfPqdUa",
            id: "3mLu6fOzdwzWf2wyfPqdUa",
            name: "Maxime Denuc",
            type: "artist",
            uri: "spotify:artist:3mLu6fOzdwzWf2wyfPqdUa",
          },
        ],
        available_markets: [""],
        external_urls: {
          spotify: "https://open.spotify.com/album/0leFuQg79HX0GPmIhhV8rl",
        },
        href: "https://api.spotify.com/v1/albums/0leFuQg79HX0GPmIhhV8rl",
        id: "0leFuQg79HX0GPmIhhV8rl",
        images: [
          {
            height: { $numberInt: "640" },
            url: "https://i.scdn.co/image/ab67616d0000b2733487520e4fd2b90918b8586f",
            width: { $numberInt: "640" },
          },
          {
            height: { $numberInt: "300" },
            url: "https://i.scdn.co/image/ab67616d00001e023487520e4fd2b90918b8586f",
            width: { $numberInt: "300" },
          },
          {
            height: { $numberInt: "64" },
            url: "https://i.scdn.co/image/ab67616d000048513487520e4fd2b90918b8586f",
            width: { $numberInt: "64" },
          },
        ],
        name: "Nachthorn",
        release_date: "2022-10-21",
        release_date_precision: "day",
        total_tracks: { $numberInt: "8" },
        type: "album",
        uri: "spotify:album:0leFuQg79HX0GPmIhhV8rl",
      },
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/3mLu6fOzdwzWf2wyfPqdUa",
          },
          href: "https://api.spotify.com/v1/artists/3mLu6fOzdwzWf2wyfPqdUa",
          id: "3mLu6fOzdwzWf2wyfPqdUa",
          name: "Maxime Denuc",
          type: "artist",
          uri: "spotify:artist:3mLu6fOzdwzWf2wyfPqdUa",
        },
      ],
      available_markets: [""],
      disc_number: { $numberInt: "1" },
      duration_ms: { $numberInt: "234827" },
      explicit: false,
      external_ids: { isrc: "BEBD42100174" },
      external_urls: {
        spotify: "https://open.spotify.com/track/2tosp3JAI9RxoiJmk6lDQB",
      },
      href: "https://api.spotify.com/v1/tracks/2tosp3JAI9RxoiJmk6lDQB",
      id: "2tosp3JAI9RxoiJmk6lDQB",
      is_local: false,
      name: "Agoraphobia",
      popularity: { $numberInt: "25" },
      preview_url:
        "https://p.scdn.co/mp3-preview/a826d3c3eed3cef715abac3c554fa792164fe6e0?cid=ff818ae646724a34b1a429c8432bd2b7",
      track_number: { $numberInt: "4" },
      type: "track",
      uri: "spotify:track:2tosp3JAI9RxoiJmk6lDQB",
    },
  ],
  total: { $numberInt: "50" },
  limit: { $numberInt: "50" },
  offset: { $numberInt: "0" },
  href: "https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0",
  next: null,
  previous: null,
};
