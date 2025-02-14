"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 text-white"
    >
      <div className="container mx-auto px-6 md:px-28 py-6">
        <nav className="flex justify-between items-center bg-black bg-opacity-50 rounded-full px-4 py-1">
          <div className="flex items-center">
            <Link href="/" className="flex gap-2 items-center">
              <Image
                src="/assets/images/GPT1.svg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>
          {session?.user ? (
            <>
              {" "}
              <div className="flex items-center space-x-3">
                <Link
                  href="/create-prompt"
                  className="text-sm bg-gray-700 bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-75 transition-all"
                >
                  create prompt
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="text-sm bg-gray-700 bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-75 transition-all"
                >
                  Sign Out
                </button>
                <Link href="/profile">
                  <Image
                    src={session?.user.image}
                    width={32}
                    height={32}
                    alt="profile image"
                    className="rounded-full"
                  />
                </Link>
              </div>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="text-sm bg-gray-700 bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-75 transition-all"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </nav>
      </div>
    </motion.div>
  );
}
