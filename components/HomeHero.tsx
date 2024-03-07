
const HomeHero = () => {
  return (
    <div className="flex flex-col items-center mx-auto py-20">
      <div className="w-[60%] flex flex-col items-center">
        <h1 className="text-4xl font-bold">Discover & Read Amazing Books</h1>
        <p className="text-md font-light text-slate-600 my-6">
          Get your desired ebooks here!.
        </p>
      </div>
      <div className="grid grid-cols-7 w-full">
        <div className="mt-10 ">
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-5.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-9.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
        </div>
        <div className=" ">
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-10.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-6.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
        </div>
        <div className="col-span-3 flex justify-center ">
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-1.png" alt="" className="h-56 mt-4 hover:-translate-y-2 duration-500" />
          <img src="https://utfs.io/f/33538382-e23e-4c92-8d2c-5023c2efef28-53fuec._SY445_SX342_.jpg" alt="" className="h-72 hover:-translate-y-2 duration-500" />
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-2.png" alt="" className="h-56 mt-4 hover:-translate-y-2 duration-500" />
        </div>
        <div className="">
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-3.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-4.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
        </div>
        <div className="mt-10 ">
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-8.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
          <img src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-7.jpg" alt="" className="h-40 m-4 hover:-translate-y-2 duration-500" />
        </div>
      </div>
    </div>
  )
}

export default HomeHero