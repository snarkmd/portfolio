import {
  faFacebook,
  faLinkedin,
  faXTwitter,
  faGithub,
  faBehance,
  faMedium,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CONTACT_EMAIL = "bentoumi.anesgh@gmail.com";
const WHATSAPP_NUMBER = "213669953599";

const links = [
  { href: "https://facebook.com/bentoumiAnes", icon: faFacebook, color: "" },
  {
    href: "https://www.linkedin.com/in/bentoumi-anes/",
    icon: faLinkedin,
    color: "",
  },
  { href: "https://x.com/snark_md", icon: faXTwitter, color: "" },
  { href: "https://github.com/snarkmd", icon: faGithub, color: "" },
  { href: "https://www.behance.net/snarkmd", icon: faBehance, color: "" },
  { href: "https://medium.com/@benanes", icon: faMedium, color: "" },
];

const purposes = [
  "Website creation",
  "Social media management",
  "Branding & design",
  "Partnership opportunity",
  "General inquiry",
];

const inputClassName =
  "bg-transparent border-b border-dark focus:outline-none focus:border-blue focus:bg-light-100/40 px-1 transition-colors duration-200 placeholder-dark";

const ContactPrompt = () => {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [purpose, setPurpose] = useState("");
  const hasMessageDetails = Boolean(name.trim() || field.trim() || purpose);

  const sendMessage = () => {
    if (!hasMessageDetails) return;

    const message = `Hello, my name is ${
      name || "[name not provided]"
    }, I work in ${
      field || "[field not provided]"
    }, and I'd like to collaborate with you for ${
      purpose || "[unspecified purpose]"
    }.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className=" w-full mx-auto my-4 text-base">
      <div className="flex flex-wrap items-center gap-2">
        <span>Hello, my name is</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          className={`${inputClassName} w-32`}
        />
        <span>, I work in</span>
        <input
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="your field"
          className={`${inputClassName} w-40`}
        />
        <span>, and I'd like to collaborate with you for</span>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className={`${inputClassName} w-40`}
        >
          <option value="">-- select --</option>
          {purposes.map((p) => (
            <option key={p} value={p} className="text-dark">
              {p}
            </option>
          ))}
        </select>
        <span>.</span>
      </div>

      <button
        type="button"
        disabled={!hasMessageDetails}
        onClick={sendMessage}
        className="mt-4 flex items-center gap-2 rounded-sm bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
        WhatsApp
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-col gap-2 px-8 md:px-16 py-2 md:py-4 min-h-[40vh] md:min-h-[50vh] bg-light-200 text-dark relative grain">
      <div className="flex flex-col flex-grow">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-mono font-light hover:italic hover:font-bold"
        >
          {CONTACT_EMAIL}
        </a>
        <h3 className="text-6xl md:text-7xl font-semibold">Lets Chat !</h3>
        <ContactPrompt />
        <ul className="flex space-x-4 mt-auto">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={link.icon}
                  className={`w-6 h-6 ${link.color} opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all duration-200`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="font-mono font-light text-sm mt-auto flex flex-col md:flex-row justify-between text-start">
        <span>
          Crafted with questionable life choices, and a sprinkle of love{" "}
          <strong className="text-red text-xl">&hearts;</strong>
        </span>
        <span className="font-thin text-xs">
          <strong className="font-sans">&copy; </strong>
          {new Date().getFullYear()} Bentoumi Anes. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
