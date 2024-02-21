
import Link from 'next/link'
import React from 'react'

const HomeHero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="text-center md:text-start w-[90%] md:w-[45%]">
            <h1 className="text-4xl font-bold   ">Complete solution for ebook selling</h1>
            <p className="text-md font-light text-slate-600 my-6">
                BookBye is an ultimate solution for ebook selling.
            </p>
            <Link href="/create" className="rounded-full border px-6 py-3 bg-gray-800 text-white">Start Selling</Link>
        </div>
        <img src="./assets/home.svg" alt="BOOKBYTE HERO" className="w-[70%] md:w-[45%]"/>
    </div>
  )
}

export default HomeHero