"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCartIcon, User2Icon } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"

const Navbar = () => {
  const [state, setState] = React.useState(false);

  const { isSignedIn, user } = useUser();

  const menus = [
    { title: "Home", path: "/" },
    { title: "Ebooks", path: "/ebooks" },
    { title: "Create", path: "/create" },
    { title: "My Profile", path: "/profile" },
  ]

  return (
    <nav className="bg-white w-full border-b md:border-0">
      <div className="flex justify-between items-center px-4 max-w-screen-xl mx-auto md:flex md:px-0">
        <div className="flex items-center justify-between w-full md:w-fit py-3 md:py-5 md:block">
          <Link href="/" className="flex items-center">
            <img src="./assets/logo.png" alt="BookByte" className="h-14 w-14 rounded-md"/>
            <div className="ml-2">
                <h1 className="text-2xl font-bold">BookByte</h1>
                <p className="text-xs text-slate-600">Ebook Marketplace</p>
            </div>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center mt-8 absolute md:relative top-16 md:top-0 w-full md:w-fit bg-white md:block md:pb-0 md:mt-0 ${
            state ? "absolute" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-gray-800">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
            <div className="">
                <button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                >
                <ShoppingCartIcon />
                </button>
            </div>
            <div className="ml-2">
                {
                  isSignedIn ? 
                  <UserButton afterSignOutUrl="/"/>
                  :
                  <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border">
                    <User2Icon />
                  </button>
                }
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;