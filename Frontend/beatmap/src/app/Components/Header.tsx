"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import SpotifyButton from "./ConnectMusicButtons/SpotifyButton";

export const Header = ({ currentUser = "" }) => {
  // TODO highlight current section
  const [activeSection, setActiveSection] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar className="backdrop-blur-lg">
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <a href="/"> BeatMap</a>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="#homepage-map">
            Map
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#homepage-my-songs">
            Top Songs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {currentUser ? `Hey ${currentUser}` : <SpotifyButton></SpotifyButton>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
