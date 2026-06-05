import { forwardRef } from "react";

// Task 5: removed the unused Headline prop from the component signature.
// Task 9: converted Headline to forwardRef so ScrollReveal can attach a DOM ref safely.
const Headline = forwardRef(({ title, description }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-baseline px-8 md:px-24 py-6 gap-4">
      <h2 className="font-serif font-light text-3xl md:text-5xl">{title}</h2>
      <p className="font-sans font-light text-base max-w-prose md:max-w-lg">
        {description}
      </p>
    </div>
  );
});

export default Headline;
