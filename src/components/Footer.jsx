import {
  faFacebook,
  faLinkedin,
  faXTwitter,
  faGithub,
  faBehance,
  faMedium,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const links = [
  {
    href: "https://facebook.com/bentoumiAnes",
    icon: faFacebook,
    color: "",
  },
  {
    href: "https://www.linkedin.com/in/bentoumi-anes/",
    icon: faLinkedin,
    color: "",
  },
  {
    href: "https://x.com/snark_md",
    icon: faXTwitter,
    color: "",
  },
  {
    href: "https://github.com/snarkmd",
    icon: faGithub,
    color: "",
  },
  {
    href: "https://www.behance.net/snarkmd",
    icon: faBehance,
    color: "",
  },
  {
    href: "https://medium.com/@benanes",
    icon: faMedium,
    color: "",
  },
];
const Footer = () => {
    const [name, setName] = useState('');
  const [field, setField] = useState('');
  const [purpose, setPurpose] = useState('');

  const purposes = [
    'Website creation',
    'Social media management',
    'Branding & design',
    'Partnership opportunity',
    'General inquiry'
  ];

  const sendMessage = () => {
    const phoneNumber = 'YOUR_PHONE_NUMBER'; // e.g., 2126XXXXXXX
    const message = `Hello, my name is ${name || '[name not provided]'}, I work in ${field || '[field not provided]'}, and I’d like to collaborate with you for ${purpose || '[unspecified purpose]'}.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return (
    <div className="flex flex-col gap-2 px-8 md:px-16 py-2 md:py-4 min-h-[40vh] md:min-h-[50vh] bg-light-200 text-dark relative grain">
      <div className="flex flex-col flex-grow">
        <a
          href="mailto:bentoumi.anesgh@gmail.com"
          className="font-mono font-light hover:italic hover:font-bold"
        >
          bentoumi.anesgh@gmail.com
        </a>
        <h3 className="text-6xl md:text-7xl font-semibold">Lets Chat !</h3>
          {/*-------------------------------*/}
             <div className=" w-full mx-auto my-4 text-base">
      <div className="flex flex-wrap items-center gap-2">
        <span>Hello, my name is</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          className="bg-transparent border-b border-dark focus:outline-none px-1 w-32 placeholder-dark"
        />
        <span>, I work in</span>
        <input
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="your field"
          className="bg-transparent border-b border-dark focus:outline-none px-1 w-40 placeholder-dark"
        />
        <span>, and I’d like to collaborate with you for</span>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="bg-transparent border-b border-transparent focus:outline-none px-1 w-56"
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
  onClick={sendMessage}
  className="mt-4 flex items-center gap-2 rounded-sm bg-green-600 px-3 py-2 text-white hover:bg-green-700 transition-colors"
>
  <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
  WhatsApp
</button>
    </div>
          {/*-------------------------------*/}
        <ul className="flex space-x-4 mt-auto">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={link.icon}
                  className={`w-6 h-6 ${link.color} opacity-60 hover:opacity-100 transition-all duration-200`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="font-mono font-light text-sm mt-auto flex flex-col md:flex-row justify-between text-start">
        <span>
          Crafted with questionable life choices, and a sprinkle of love{" "}
          <strong className="text-red text-xl">♥</strong>
        </span>
        <span className="font-thin text-xs">
          <strong className="font-sans">© </strong>2025 Bentoumi Anes. All
          rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
