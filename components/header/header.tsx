"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { NavBar } from "./dekstop";
import NavBarMobile from "./mobile";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isBlurred, setIsBlurred] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/auth');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Jika scroll ke atas, tampilkan navbar
      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true);
      }
      // Jika scroll ke bawah, sembunyikan navbar
      else {
        setIsVisible(false);
      }

      // Update className berdasarkan posisi scroll
      //if (currentScrollPos <= 100) {
      //  setNavClass("text-white"); // Class saat di paling atas
      //} else {
      //  setNavClass("text-black"); // Class saat di-scroll
      //}

      // Update state untuk blur efek jika scrollY > 50
      setIsBlurred(currentScrollPos > 100);

      // Simpan posisi scroll saat ini
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  if (isAuthPage) {
    return null;
  }

  return (
    <nav
      className={`z-20 px-7 xl:px-36 lg:px-20 md:px-14 transition-all ease-in fixed w-full ${
        isVisible ? "translate-y-0" : "-translate-y-full" // Animasi hide/show
      } ${isBlurred ? "backdrop-blur-sm bg-white/[0.6] py-4" : "py-8"}`} // Changed to white with opacity
    >
      <div className="flex justify-between items-center w-full">
        <div className="sm:flex hidden items-center w-full">
          <NavBar />
        </div>

        <div className="sm:hidden flex items-center w-full">
          <NavBarMobile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
