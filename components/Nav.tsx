"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  getProviders,
  useSession,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

type Props = {};

const Nav = (props: Props) => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    const setProvidersFn = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setProvidersFn();
  }, []);

  return (
    <nav className="flax-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          className="object-contain"
          alt=""
          width="30"
          height="30"
          src="/assets/images/logo.svg"
        ></Image>
        <p className="logo_text">Prompts</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden justify-end">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="/create-prompt">
              Create prompt
            </Link>
            <button
              className="outline_btn"
              type="button"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image || "/assets/images/logo.svg"}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image || "/assets/images/logo.svg"}
              width={30}
              height={30}
              className="rounded-full"
              alt="profile"
              onClick={() => setDropDown((prev) => !prev)}
            ></Image>
            {dropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setDropDown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setDropDown(false)}
                >
                  Create prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setDropDown(false);
                    signOut();
                  }}
                ></button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
