import AnimatedMenu from "../components/UI/AnimatedMenu";
const Header = () => {
  return (
    <header className="flex justify-between items-center w-full px-8 pt-4 md:px-16 md:pt-8 bg-light-100">
      <div className="flex flex-col">
        {/* Title */}
        <p className="text-xl md:text-2xl font-sans font-bold text-dark">
          Snark M.D.
        </p>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-50 animate-ping"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green"></span>
          </span>
          <span className="text-[10px] md:text-xs text-dark font-mono font-semibold">
            Open to work
          </span>
        </div>
      </div>
      <AnimatedMenu />
    </header>
  );
};

export default Header;
