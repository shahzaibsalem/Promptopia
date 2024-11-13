"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import logo from "@/public/assets/images/promptopia_logo.png";
const Nav = () => {
  const { data: session } = useSession();

  const [providers, setproviders] = useState(null);
  const [toggledrop, settoggledrop] = useState(false);

  useEffect(() => {
      const setUpProviders = async () => {
      const response = await getProviders();
      setproviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="Promptopia logo"
          width={37}
          height={37}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
        <div></div>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" type="button" onClick={signOut}>
              SignOut
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers ? (
              Object.values(providers).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            ) : (
              <p></p>
            )}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user.image}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => settoggledrop((prev) => !prev)}
            />
            {toggledrop && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggledrop(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggledrop(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggledrop(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers ? (
              Object.values(providers).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In with {prov.name}
                </button>
              ))
            ) : (
              <p>No providers available</p>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
