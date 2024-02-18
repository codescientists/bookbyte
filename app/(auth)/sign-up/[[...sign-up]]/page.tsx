import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <div className="flex h-screen">
  <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
    <div className="max-w-md text-center">
      {/* <img src="/assets/register.jpg" alt=""/>  */}
    </div>
  </div>
  <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
    <div className="max-w-md w-full p-6">
      <SignUp/>
    </div>
  </div>
</div>;
}