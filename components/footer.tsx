import React from "react";
import Image from "next/image";
import {
  BulletIcon,
  FacebookIcon,
  HeadPhoneIcon,
  InstagramIcon,
  WhatsappIcon,
} from "./icons";
import { business } from "@/configs/business";
import Link from "next/link";

export const Footer = () => {
  const sectionLinks = [
    {
      title: "Find product",
      links: [
        {
          text: "Brownze arnold",
          href: "#",
        },
        {
          text: "Chronograph blue",
          href: "#",
        },
        {
          text: "Smart phones",
          href: "#",
        },
        {
          text: "automatic watches",
          href: "#",
        },
        {
          text: "hair straighteners",
          href: "#",
        },
      ],
    },
    {
      title: "Get help",
      links: [
        {
          text: "About us",
          href: "#",
        },
        {
          text: "contact us",
          href: "#",
        },
        {
          text: "return policy",
          href: "#",
        },
        {
          text: "privacy policy",
          href: "#",
        },
        {
          text: "payment policy",
          href: "#",
        },
      ],
    },
    {
      title: "About us",
      links: [
        {
          text: "news",
          href: "#",
        },
        {
          text: "service",
          href: "#",
        },
        {
          text: "our policy",
          href: "#",
        },
        {
          text: "customer care",
          href: "#",
        },
        {
          text: "FAQs",
          href: "#",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-10 p-12 bg-primary/10 dark:bg-neutral-gray">
      <div className="p-12 bg-white items-center justify-center flex gap-5">
        <div className="flex gap-5">
          <HeadPhoneIcon className="w-11 h-11 text-secondary" />
          <div className="flex flex-col text-neutral-gray">
            <p className="text-sm font-semibold">Call us 24/7</p>
            <p className="text-sm font-semibold">{business.phone}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-6">
          <div className="relative h-[48px] w-[232px]">
            <Image src="/img/logo-long.png" fill alt="HX Logo" />
          </div>

          <p>
            64 st james boulevard
            <br />
            hoswick , ze2 7zj
          </p>

          <hr className="border-neutral-30" />

          <div className="flex gap-8 justify-center">
            <Link href="#">
              <InstagramIcon className="w-6 h-6" />
            </Link>
            <Link href="#">
              <FacebookIcon className="w-6 h-6" />
            </Link>
            <Link href="#">
              <WhatsappIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {sectionLinks.map((section, i) => (
          <div className="flex flex-col gap-3.5" key={i}>
            <h1 className="text-primary font-semibold text-xl">
              {section.title}
            </h1>

            {section.links.map((link, ind) => (
              <Link href={link.href} key={ind}>
                <div className="flex gap-3 items-center">
                  <BulletIcon className="w-2.5 h-2.5 text-primary" />
                  <p className="capitalize">{link.text}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
