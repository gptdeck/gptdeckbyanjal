"use client";

import { useState } from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "information-we-collect", title: "1. Information We Collect" },
    { id: "how-we-use", title: "2. How We Use Your Information" },
    { id: "how-we-share", title: "3. How We Share Your Information" },
    { id: "your-choices", title: "4. Your Choices and Rights" },
    { id: "data-security", title: "5. Data Security" },
    { id: "data-retention", title: "6. Data Retention" },
    { id: "third-party-links", title: "7. Third-Party Links" },
    { id: "childrens-privacy", title: "8. Children's Privacy" },
    { id: "changes-to-policy", title: "9. Changes to This Policy" },
    { id: "contact-us", title: "10. Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Effective Date: 01/01/2025</p>

        <div className="mb-12 p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl border border-gray-700">
          <p>
            At GPTDeck, we value your privacy and are committed to protecting
            your personal data. This Privacy Policy outlines how we collect,
            use, store, and disclose information when you use our platform.
          </p>
        </div>

        <div className="lg:flex lg:gap-8">
          <nav className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block py-1 px-2 rounded transition ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-800"
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="lg:w-3/4">
            <section id="information-we-collect" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                1. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                1.1. Information You Provide
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Account Information:</strong> When you register, we
                  collect details such as your name, email address, and
                  username.
                </li>
                <li>
                  <strong>Content:</strong> Prompts or any other content you
                  share on the platform.
                </li>
                <li>
                  <strong>Payment Information:</strong> For purchases like the
                  premium ebook, we collect necessary payment details via secure
                  third-party payment processors.
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-2">
                1.2. Information We Automatically Collect
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Usage Data:</strong> Information about your
                  interactions with the platform, such as pages viewed, time
                  spent, and features used.
                </li>
                <li>
                  <strong>Device Information:</strong> Information like your IP
                  address, browser type, and operating system.
                </li>
                <li>
                  <strong>Cookies:</strong> Small data files stored on your
                  device to enhance your experience. You can control cookies
                  through your browser settings.
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-2">
                1.3. Third-Party Information
              </h3>
              <p>
                We may collect data from third-party services (e.g., when you
                log in using social media accounts).
              </p>
            </section>

            <section id="how-we-use" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To provide, improve, and personalize the GPTDeck platform.
                </li>
                <li>To process payments and manage purchases.</li>
                <li>
                  To communicate with you, including updates, promotions, and
                  customer support.
                </li>
                <li>To ensure platform security and prevent misuse.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>

            <section id="how-we-share" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Share Your Information
              </h2>
              <p className="mb-4">
                We do not sell your personal data. However, we may share your
                information in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>With Service Providers:</strong> For payment
                  processing, hosting, and analytics.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> To comply with legal
                  obligations or respond to lawful requests.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In case of mergers,
                  acquisitions, or asset sales.
                </li>
              </ul>
            </section>

            <section id="your-choices" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                4. Your Choices and Rights
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Access and Update:</strong> You can access or update
                  your account information via your profile settings.
                </li>
                <li>
                  <strong>Delete Account:</strong> You can request account
                  deletion by contacting us.
                </li>
                <li>
                  <strong>Cookies:</strong> Manage cookie preferences through
                  your browser.
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from promotional
                  communications via the link provided in emails.
                </li>
              </ul>
            </section>

            <section id="data-security" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p>
                We use reasonable measures to protect your information from
                unauthorized access, alteration, or destruction. However, no
                system is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section id="data-retention" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p>
                We retain your data as long as your account is active or as
                necessary to fulfill the purposes outlined in this policy. You
                can request deletion of your data at any time.
              </p>
            </section>

            <section id="third-party-links" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                7. Third-Party Links
              </h2>
              <p>
                The platform may contain links to third-party websites. We are
                not responsible for their privacy practices and encourage you to
                review their policies.
              </p>
            </section>

            <section id="childrens-privacy" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                8. Children's Privacy
              </h2>
              <p>
                GPTDeck is not intended for users under the age of 13. We do not
                knowingly collect personal data from children. If we become
                aware of such data, we will delete it.
              </p>
            </section>

            <section id="changes-to-policy" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be effective upon posting, and we encourage you to review
                this policy periodically.
              </p>
            </section>

            <section id="contact-us" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy,
                please contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:heygptdeck@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  heygptdeck@gmail.com
                </a>
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl border border-gray-700">
              <p className="text-center">
                By using GPTDeck, you agree to this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
