"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`flex z-50 w-full fixed top-0 left-0 right-0 py-1 px-32 bg-black text-white transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/assets/images/GPT1.svg"
            alt="gptdeck logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <p className="logo_text"></p>
        </Link>
        {/* for desktop view */}
        <div className="sm:flex hidden items-center">
          {session?.user ? (
            <>
              <div className="flex gap-3 md:gap-5 items-center">
                <Link href="/create-prompt" className="">
                  <HoverBorderGradient className="bg-black text-white flex items-center space-x-2">
                    create post
                  </HoverBorderGradient>
                </Link>

                <button type="button" className="" onClick={signOut}>
                  <HoverBorderGradient className="bg-white text-black flex items-center space-x-2">
                    Sign Out
                  </HoverBorderGradient>
                </button>

                <Link href="/profile">
                  <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
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
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>

        {/* mobile view */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <>
              <div className="flex">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="profile image"
                  className="rounded-full"
                  onClick={() => {
                    setToggleDropdown((prev) => !prev);
                  }}
                />
                {toggleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      onClick={() => setToggleDropdown(false)}
                      className="dropdown_link"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      onClick={() => setToggleDropdown(false)}
                      className="dropdown_link"
                    >
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
