import { Accordion } from "@/components";
import React from "react";

const FAQPage = () => {
  return (
    <>
      <h1 className="text-primary text-5xl font-bold uppercase text-center">
        FAQs
      </h1>

      <div className="w-full max-w-3xl mx-auto">
        <Accordion>
          {faqs.map(({ title, details }, i) => (
            <Accordion.Item
              key={i}
              defaultOpen={i === 0}
              header={title}
              headerClassName="text-lg"
              className="mb-4"
            >
              <div>{details}</div>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default FAQPage;

const faqs = [
  {
    title: "What types of computers do you sell?",
    details:
      "We sell a wide range of computers including laptops, desktops, 2-in-1s, gaming laptops, and workstations from leading brands.  Brands include HP, Lenovo and Dell.",
  },
  {
    title: "Can I customize my computer?",
    details:
      "Yes, some of our computers offer customization options such as RAM, storage, graphics cards, and more. Check the product page for customization details",
  },
  {
    title: "What is the warranty on your computers?",
    details:
      "Our computers come with a 14 days warranty, typically covers hardware defects.",
  },
  {
    title: "Do you offer repairs and maintenance services?",
    details:
      "Yes, we offer repair and maintenance services for computers purchased from our store. Contact our customer service for assistance.",
  },
  {
    title: "How do I know which computer is right for me?",
    details:
      "We provide detailed product descriptions, specifications, customer reviews, and buying guides to help you choose the right computer based on your needs and preferences.",
  },
  {
    title: "Can I trade in my old computer?",
    details: "No",
  },
  {
    title: "Do you offer financing options?",
    details:
      "Yes, we offer financing options through third-party providers. Details and eligibility criteria can be found during the checkout process.",
  },
  {
    title: "How long does delivery take?",
    details:
      "Delivery times vary depending on your location and the delivery method chosen. Typically, orders are processed within 24 hours. Expedited delivery options are available.",
  },
  {
    title: "Can I return or exchange a computer if I'm not satisfied?",
    details: "No",
  },
  {
    title: "Do you offer technical support?",
    details:
      "Yes, we provide technical support to assist with setup, troubleshooting, and general inquiries about our computers. Contact our support team for assistance.",
  },
  {
    title: "Can I purchase computer accessories from your website?",
    details:
      "Yes, we offer a variety of computer accessories such as keyboards, mice, monitors, adapters, and more. Browse our Accessories section for available products.",
  },
  {
    title: "How do I know if a computer is compatible with my software?",
    details:
      "Check the computer's specifications and compare them with the software requirements. Our customer support team can also help you determine compatibility",
  },
  {
    title: "Can I upgrade my computer's components?",
    details:
      "Depending on the model, some computers allow for component upgrades such as RAM, storage, and graphics cards. Refer to the product specifications or contact us for upgrade options.",
  },
  {
    title: "Do you offer discounts or promotions?",
    details:
      "Yes, we periodically offer discounts, promotions, and special deals on selected computers and accessories. Check our website or subscribe to our newsletter for updates.",
  },
  {
    title: "How secure is your website for online transactions?",
    details:
      "Our website uses industry-standard encryption and security protocols to ensure your personal and payment information is secure during online transactions.",
  },
  {
    title: "Are pick-up options available?",
    details:
      "Yes, we offer in-store pick-up options for online orders. Select the pick-up option during checkout and wait for confirmation before visiting our store.",
  },
  {
    title: "What payment methods do you accept?",
    details:
      "We accept Visa, bank transfer, momo and sometimes other payment methods depending on your location and order specifics.",
  },
];
