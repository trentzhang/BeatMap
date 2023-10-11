interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TopTracks {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

interface ExternalUrls {
  spotify: string;
}
interface Follower {
  href: string | null;
  total: number;
}

interface SpotifyProfile {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  type: string;
  uri: string;
  followers: Follower;
}

interface AuthorizationInfo {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
interface SpotifyLocation {
  type: string;
  coordinates: [number, number];
}

interface MongoDBUserData {
  _id: string;
  profile: SpotifyProfile;
  authorizationInfo: AuthorizationInfo;
  topTracks: TopTracks;
  location: SpotifyLocation;
  updatedAt: string;
}

interface MyMarker {
  position: L.LatLng;
}
