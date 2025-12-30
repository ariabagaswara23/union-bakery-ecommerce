import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#211D1F] text-white pt-12">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-8 py-10 md:py-14">
          <div className="">
            <h3 className="text-white text-xs uppercase tracking-wider font-medium mb-4">
              Union Bakery
            </h3>
            <div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-white hover:text-gray-300 font-bold text-sm"
                  >
                    SHOP
                  </a>
                </li>
                <li>
                  <a
                    href="/group-order"
                    className="text-white hover:text-gray-300 font-bold text-sm"
                  >
                    GROUP ORDER
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-white hover:text-gray-300 font-bold text-sm"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xs uppercase tracking-wider font-medium mb-4">
              Get in Touch
            </h3>
            <p className="mb-2 font-medium text-sm">
              WA.{" "}
              <a
                href="tel:+6288211573980"
                className="text-white hover:text-gray-300 font-semibold"
              >
                (+62)882 1157 3980
              </a>
            </p>
            <p className="font-medium text-sm">
              E.{" "}
              <a
                href="mailto:BAKERY@UNIONJKT.COM"
                className="text-white hover:text-gray-300 font-semibold"
              >
                BAKERY@UNIONJKT.COM
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-white text-xs uppercase tracking-wider font-medium mb-4">
              Connect With Us
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/unionjkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 font-bold text-sm"
                >
                  @UNIONJKT
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/union.sby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 font-bold text-sm"
                >
                  @UNION.SBY
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 font-bold text-sm"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-xs uppercase tracking-wider font-medium mb-4">
              Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-white hover:text-gray-300 font-bold text-sm"
                >
                  TERMS OF SERVICE
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white hover:text-gray-300 font-bold text-sm"
                >
                  PRIVACY POLICY
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="h-px text-white" />
      <div className="py-4 px-6 mx-auto max-w-6xl">
        <p className="text-white text-xs font-medium">
          © 2024 The Union Group. All rights reserved.{" "}
          <br className="block md:hidden" /> Site by Antikode.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
