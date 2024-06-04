"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { BulletIcon, WhatsappIcon } from "./icons";
import { business, navigation } from "@/configs";
import { classNames } from "@/libs";

export const Footer = () => {
  const sectionLinks = [
    {
      title: "Company",
      links: [
        {
          text: "about us",
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
      title: "Support",
      links: [
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
    <div
      className={classNames(
        "bg-primary/10 dark:bg-neutral-gray",
        "flex flex-col",
        "gap-10 p-12",
        "justify-around"
      )}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-6 justify-between">
        <div className="flex flex-col gap-6">
          <Link href="/" className="relative h-[48px] w-[232px]">
            <Image src="/img/logo-long.png" fill priority alt="HX Logo" />
          </Link>

          <div className="flex gap-4">
            <MapPinIcon className="w-6" />
            <Link
              href={"https://maps.app.goo.gl/XH1k6hQjQm66BLCs6"}
              target="_blank"
            >
              Manono Street,
              <br />
              Capital Hills, Accra
            </Link>
          </div>

          <hr className="border-neutral-30" />

          <div className="flex gap-8">
            <Link href={business.socials.whatsapp} target="_blank">
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
