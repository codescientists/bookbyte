import Footer from "@/components/shared/Footer";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </section>
  )
}

export default Layout
