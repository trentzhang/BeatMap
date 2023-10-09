"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import SpotifyButton from "./ConnectMusicButtons/SpotifyButton";
import React, { useState, useEffect, useRef } from "react";

export const Header = ({ currentUser = "" }) => {
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

  useEffect(() => {}, [scrollPosition]);

  return (
    <Navbar className="backdrop-blur-lg">
      <NavbarBrand>
        <p className="font-bold text-inherit">BeatMap</p>
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
