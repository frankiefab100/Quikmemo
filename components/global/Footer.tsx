import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/constants/data";
import Logo from "../../public/icons/quikmemo-full-lockup-logo.svg";

export default function Footer() {
  return (
    <div className="py-10 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12">
          <div className="col-span-2 md:col-span-4">
            <Image
              className="w-auto h-6"
              src={Logo}
              alt="Quikmemo logo"
              width="50"
              height="50"
            />
          </div>
          {FOOTER_LINKS.map((section, index) => (
            <div className="lg:col-span-2" key={index}>
              <p className="text-base font-semibold text-gray-900">
                {section.title}
              </p>
              <ul className="mt-4 space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link}
                      title={link}
                      className="flex text-sm text-gray-800 transition-all duration-200 hover:text-blue-700 focus:text-blue-700"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            &copy; Copyright 2025, All Rights Reserved by Quikmemo
          </p>

          <ul className="flex items-center mt-5 space-x-3 md:order-3 sm:mt-0">
            {[
              {
                icon: <Twitter className="w-4 h-4" />,
                href: "https://twitter.com",
              },
              {
                icon: <Instagram className="w-4 h-4" />,
                href: "https://instagram.com",
              },
              {
                icon: <Linkedin className="w-4 h-4" />,
                href: "https://linkedin.com",
              },
              {
                icon: <Github className="w-4 h-4" />,
                href: "https://github.com",
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-gray-800 transition-all duration-200 bg-transparent border border-gray-300 rounded-full w-7 h-7 focus:bg-blue-600 hover:text-white focus:text-white hover:bg-blue-600 hover:border-blue-600 focus:border-blue-600"
              >
                {item.icon}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
