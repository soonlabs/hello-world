"use client";

import ConnectButton from "./ConnectedButton";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-4 md:px-6 py-[14px] border-b-[0.8px] border-black border-opacity-10">
      <div className="hidden md:flex items-center py-2 px-4 w-full max-w-[32rem] space-x-3 rounded-lg"></div>
      <div className="flex items-center gap-2">
        <ConnectButton />
      </div>
    </nav>
  );
}
