const Headline = ({ addToEl,title, description }) => {
  return (
    <div className="flex flex-col items-baseline px-8 md:px-24 py-6 gap-4">
      <h2 className="font-serif font-light text-3xl md:text-5xl">{title}</h2>
      <p className="font-sans font-light text-base max-w-prose md:max-w-lg">
        {description}
      </p>
    </div>
  );
};

export default Headline;
