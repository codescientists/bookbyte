import "../globals.css";
import Navbar from "@/components/shared/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div>
        <Navbar />
        {children}
      </div>
    </section>
  );
}
