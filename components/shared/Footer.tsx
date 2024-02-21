import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10">
      <div className="container grid grid-cols-1 md:grid-cols-4 w-full">
            <div className="flex flex-col items-start">
                <h2 className="font-bold text-xl tracking-tight">BookByte</h2>
                <div className="flex flex-col items-start">
                <a href="#" className=" mr-4">Subscribe
                </a>
                <p className="text-sm">Get 10% off your first order
                </p>
                </div>
            </div>
            <div className="flex flex-col md:items-start mb-4 md:mb-0">
                <h4 className="font-semibold text-md mb-2 md:mb-0">Support</h4>
                <div className="flex flex-col items-start">
                    <p className="text-sm">
                        Mumbai, Maharashtra, India.
                    </p>
                    <a href="#" className="">
                        +123-123-1233
                    </a>
                    <a href="#" className="">
                        bookbyte@gmail.com
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-start">
                <h4 className="font-semibold text-sm mb-2 md:mb-0">Account</h4>
                <ul className="mt-2">
                    <li className="mb-2">
                        <a href="#" className="">My Account</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="">Login / Register</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="">Cart</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="">Wishlist</a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h4 className="font-semibold text-sm mb-2 md:mb-0">Quick Link</h4>
                <ul className="mt-2">
                    <li className="mb-2">
                    <a href="#" className="">Privacy Policy</a>
                    </li>
                    <li className="mb-2">
                    <a href="#" className="">Terms Of Use</a>
                    </li>
                    <li className="mb-2">
                    <a href="#" className="">FAQ</a>
                    </li>
                    <li className="mb-2">
                    <a href="#" className="">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  );
};

export default Footer;