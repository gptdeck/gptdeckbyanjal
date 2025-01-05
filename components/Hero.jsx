import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Trophy } from "lucide-react";
import PulsatingButton from "./ui/pulsating-button";
import Logo from "./Logo";
export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 pt-4">
        <main className="text-center px-4 py-20">
          <Link
            href="#"
            className="inline-flex items-center space-x-2 bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 mb-8 hover:bg-opacity-75 transition-all"
          >
            <Instagram size={16} />
            <span>Follow us on Instagram</span>
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Explore & Share
            <br />
            <span className="text-gray-400">Inspiring GPT Prompts</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-8">
            GPTDeck is your go-to platform to discover, create, and share
            powerful GPT prompts with a community of AI enthusiasts.
          </p>

          <Link
            href="#"
            className="inline-flex items-center text-gray-900 px-6 py-3 font-semibold transition-all"
          >
            <PulsatingButton>
              <div className="inline-flex items-center space-x-2">
                <span className="text-sm md:text-md">
                  Unlock Premium Prompts – Limited Edition eBook
                </span>
                <ArrowUpRight size={20} className="hidden md:block" />
              </div>
            </PulsatingButton>
          </Link>
          <p className="max-w-sm mx-auto text-sm text-gray-300 mb-4">
            Only 1500 copies available, unlock endless creativity with exclusive
            prompts designed to elevate your GPT experience.
          </p>

          {/* <div className="mt-12 inline-flex items-center space-x-2 bg-gray-800 bg-opacity-50 rounded-full px-4 py-2">
            <Trophy size={24} className="text-yellow-500" />
            <span className="font-semibold">PRODUCT HUNT</span>
            <span className="text-gray-300">#1 Product of the Day</span>
          </div> */}
        </main>

        <footer className="text-center pb-8">
          <p className="text-gray-400 mb-4">
            Works perfectly with the conversational AI you love.
          </p>
          <div className="flex justify-center space-x-8">
            {/* <Image
              src="/placeholder.svg"
              alt="Medium"
              width={100}
              height={32}
            />
            <Image
              src="/placeholder.svg"
              alt="Notion"
              width={100}
              height={32}
            />
            <Image
              src="/placeholder.svg"
              alt="Other App"
              width={32}
              height={32}
            /> */}
            <Logo />
          </div>
        </footer>
      </div>
    </div>
  );
}
