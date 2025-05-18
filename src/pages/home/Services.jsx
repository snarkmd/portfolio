import React, { useState } from "react";
import { Plus } from "lucide-react";
import { services } from "../../assets/data";
import { useSound } from "../../context/soundProvider";
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { playSound } = useSound();
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="section">
      <ul className="flex flex-col px-8 md:px-16 mx-auto">
        {services.map((service, index) => (
          <li className="py-6 border-t-2 border-dark font-sans" key={index}>
            <div
              className="flex justify-between items-center cursor-pointer p-1 md:p-2 text-xl md:text-2xl font-semibold group"
              onClick={() => toggleAccordion(index)}
              onMouseEnter={() => playSound(index)}
            >
              <h3 className=" font-medium font-mono group-hover:italic max-w-[90%]">
                {service.title}{" "}
                <span className="group-hover:inline-block text-xl md:text-2xl font-bold hidden not-italic">
                  ✳
                </span>
              </h3>
              <Plus
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-45" : ""
                }`}
              />
            </div>
            <div
              className={`transition-all overflow-hidden duration-300 ${
                activeIndex === index ? "max-h-screen p-1 pt-4" : "max-h-0 p-0"
              }`}
            >
              <p className="mb-2">{service.description}</p>
              {service.engagementType && (
                <p>
                  <strong>Engagement Type:</strong> {service.engagementType}
                </p>
              )}
              {service.contractType && (
                <p>
                  <strong>Contract Type:</strong> {service.contractType}
                </p>
              )}
              {service.mission && (
                <p>
                  <strong>Mission:</strong> {service.mission}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
