"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { BulletIcon, InstagramIcon, WhatsappIcon } from "./icons";
import { business } from "@/configs";
import { classNames } from "@/libs";
import { routes } from "@/routes";

export const Footer = () => {
  const sectionLinks = [
    {
      title: "Company",
      links: [
        {
          text: "about us",
          href: routes.about,
        },
        {
          text: "return policy",
          href: routes.return_policy,
        },
        {
          text: "warranty",
          href: routes.warranty,
        },
        {
          text: "payment policy",
          href: routes.payment_policy,
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          text: "FAQs",
          href: routes.faqs,
        },
      ],
    },
  ];

  return (
    <div
      className={classNames(
        "bg-primary/10 dark:bg-neutral-gray",
        "flex flex-col",
        "gap-10 p-12"
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col divide-y divide-neutral-30 w-max">
          <div className="flex flex-col">
            <Link href="/" className="relative h-[48px] w-[232px]">
              <Image src="/img/logo-long.png" fill priority alt="HX Logo" />
            </Link>

            <div className="flex gap-4 py-6">
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
          </div>

          <div className="flex gap-8 py-6">
            <Link href={business.socials.instagram} target="_blank">
              <InstagramIcon className="w-6 h-6" />
            </Link>
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
              <Link href={link.href} key={ind} className="w-max">
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
