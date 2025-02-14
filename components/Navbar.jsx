"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

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

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    router.push(path);
  };

  const handleSignOut = async () => {
    setMobileMenuOpen(false);
    await signOut();
  };

  const NavLinks = () => (
    <>
      <button
        onClick={() => handleNavigation("/create-prompt")}
        className="text-sm bg-gray-700 bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-75 transition-all text-left"
      >
        create prompt
      </button>
      <button
        onClick={() => handleNavigation("/leaderboard")}
        className="text-sm bg-gray-700 bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-75 transition-all text-left"
      >
        leaderboard
      </button>
      <button
        type="button"
        onClick={handleSignOut}
        className="text-sm bg-gray-700 bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-75 transition-all"
      >
        Sign Out
      </button>
    </>
  );

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
      <div className="container mx-auto px-4 md:px-28 py-6">
        <nav className="flex justify-between items-center bg-black bg-opacity-50 rounded-full px-4 py-1">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation("/")}
              className="flex gap-2 items-center"
            >
              <Image
                src="/assets/images/GPT1.svg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
          </div>

          {session?.user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-3">
                <NavLinks />
                <button onClick={() => handleNavigation("/profile")}>
                  <Image
                    src={session?.user.image}
                    width={32}
                    height={32}
                    alt="profile image"
                    className="rounded-full"
                  />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2"
                >
                  <Menu size={24} />
                </button>
              </div>

              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 mx-5 bg-black bg-opacity-90 rounded-lg p-4 md:hidden">
                  <div className="flex flex-col space-y-3">
                    <NavLinks />
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="flex items-center space-x-2"
                    >
                      <Image
                        src={session?.user.image}
                        width={32}
                        height={32}
                        alt="profile image"
                        className="rounded-full"
                      />
                      <span>Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signIn(provider.id);
                    }}
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
