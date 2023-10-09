"use client";
import { topTracksDefault } from "@/app/Utils/DefaultVariables";
import { SpotifyCard } from "./TrackCard";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

export default function MusicComponent({ topTracks = topTracksDefault.items }) {
  return (
    <Card className="mx-5 min-h-[30em] bg-gradient-to-b from-blue-600 to-slate-500">
      <CardBody>
        {/* <Accordion className="w-full"> */}
        {/* <AccordionItem
              textValue="Yes"
              title={
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
                Top 50 Songs
                </h1>
              }
            > */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
          Top 50 Songs
        </h1>
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {topTracks?.map((topTrack) => (
            <SpotifyCard topTrack={topTrack} key={topTrack.id}></SpotifyCard>
          ))}
        </section>
        {/* </AccordionItem> */}
        {/* </Accordion> */}
      </CardBody>
    </Card>
  );
}
