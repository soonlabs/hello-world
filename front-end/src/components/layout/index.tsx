"use client";

import React from "react";
import Navbar from "../Navbar";
import Hero from "../hero";

export default function Layout() {
  return (
    <div>
      <div className="fixed bg-white z-10 w-full">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
