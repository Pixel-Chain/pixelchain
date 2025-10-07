import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex-between flex-row px-6 py-6">
      <div className="heading">Pixel Chain</div>

      <div className="flex-between flex-row gap-12">
        <Link href="/create" className="text-[20px] font-medium">
          Create
        </Link>

        <Link href="/marketplace" className="text-[20px] font-medium">
          Marketplace
        </Link>

        <div className="inline-flex items-center gap-4 rounded-full bg-slate-100 px-4 py-3 outline-1 outline-neutral-900 transition-all hover:outline-2 focus-within:outline-2">
          <Image
            src="/icons/search-icon.svg"
            alt="Search icon"
            width={24}
            height={24}
            className="text-neutral-900"
          />
          <input
            type="text"
            placeholder="Search for NFTs"
            className="flex-1 bg-transparent text-base text-[16px] font-medium text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-between flex-row gap-6">
        <Link
          href="/connect-wallet"
          aria-label="Connect Wallet"
          className="inline-flex items-center justify-center rounded-full px-5 py-3 text-[16px] font-medium text-offwhite bg-[#0A21C0] hover:bg-[#0b27e6] active:bg-[#091da3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A21C0] transition-colors whitespace-nowrap"
        >
          Connect Wallet
        </Link>

        <div className="h-11 w-0.5 rounded-full bg-neutral-800" />

        <Link href="/profile" aria-label="Profile">
          <Image
            src="/icons/profile-icon.svg"
            alt="Profile"
            width={48}
            height={48}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
