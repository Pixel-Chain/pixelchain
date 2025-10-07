import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex mx-32 py-10 justify-start gap-16">


      <div className="w-[661px] inline-flex flex-col justify-start items-start gap-8">
        <div className="text-[64px] font-bold">
          Create and Collect your Pixel Art
        </div>
        <div className="text-[20px] font-medium">
          NFT Marketplace brings artist and creators together on a single
          platforms
        </div>

        <Link
          href="/create"
          aria-label="Create Your Own NFTs"
          className="inline-flex items-center justify-center rounded-full px-5 py-3 text-[16px] font-medium text-offwhite bg-[#0A21C0] hover:bg-[#0b27e6] active:bg-[#091da3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A21C0] transition-colors w-fit"
        >
          Create Your Own NFTs
        </Link>
      </div>

      <div>
        <Image src="hero-image.svg" alt="Hero image" width={448} height={564} />
      </div>
    </div>
  );
}
