import Image from "next/image";
import { Children } from "react";

const navigation = [
  { name: "About", href: "#" },
  { name: "Docs", href: "#" },
];

export default function HeaderSection({ children }) {
  return (
    <div className="bg-gradient-to-br pb-10 from-pink-100 via-blue-100 to-white">
      <header>
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="w-full py-6 flex items-center justify-between  lg:border-none">
            <div className="flex items-center ">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img className="h-10 w-auto" src="/Mvlogo.svg" alt="" />
              </a>
              <div className="hidden ml-10 space-x-8 lg:block">
                {navigation.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-deep-pink hover:text-blue-400"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <button className="inline-block rounded-md bg-deep-pink py-1.5 px-4 border border-transparent uppercase text-sm font-medium text-white hover:bg-blue-400">
                Connect
              </button>
            </div>
          </div>
          <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
            {navigation.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-deep-pink hover:text-blue-400"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
