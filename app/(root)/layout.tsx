import Footer from "@/components/shared/Footer";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-1'>
      <div className="flex h-screen flex-col wrapper">
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
