"use client";
import { SpotifyCard } from "./TrackCard";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
export default function MusicComponent({ topTracks }: { topTracks: [] }) {
  return (
    <div className="w-full h-full">
      <Card className="mx-5 min-h-[30em] bg-gradient-to-b from-blue-600 to-slate-500">
        <CardBody>
          {/* <Accordion className="w-full"> */}
          {/* <AccordionItem
              textValue="Yes"
              title={
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
                  Your Top 50 Songs
                </h1>
              }
            > */}
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
          {/* </AccordionItem> */}
          {/* </Accordion> */}
        </CardBody>
      </Card>
    </div>
  );
}
