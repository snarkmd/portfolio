import { ArrowUpRight, Send } from "lucide-react";
import { conditions } from "../../assets/data";

const ReachMe = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto py-8"
      style={{ maxWidth: "90vw" }}
    >
      {/* Not a Right Fit */}
      <div className="relative flex flex-col col-span-1 p-4 md:p-6 grain rounded-sm border border-dark border-opacity-10">
        <h2 className="text-4xl font-bold mb-2 text-dark">
          Probably Not a Good Fit If:
        </h2>
        <hr className="border-t border-dark my-6" />
        <ul className="md:pl-4 my-6">
          {conditions.dont.map((condition, index) => (
            <li className="flex items-start gap-2 py-1" key={index}>
              <ArrowUpRight className="text-red" size={20} />
              <p className="max-w-[90%]">
                <strong>{condition.strong}</strong>
                {" " + condition.comment}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-xs text-dark">
          <strong className="text-xl text-red">*</strong> I’m committed to
          meaningful, respectful, and impactful work.
        </div>
      </div>

      {/* Reach Me */}
      <div className="relative flex flex-col col-span-1 p-4 md:p-6 bg-red  text-light-100 grain rounded-sm">
        <h2 className="text-4xl font-bold">
          We’ll Get Along Great If You’re About:
        </h2>
        <hr className="border-t my-10" />
        <ul className="md:pl-4 mb-16">
          {conditions.do.map((condition, index) => (
            <li className="flex items-start gap-2 py-1" key={index}>
              <ArrowUpRight className="text-light-100" size={20} />
              <p className="max-w-[90%]">
                <strong className="text-light-200">{condition.strong}</strong>
                {" " + condition.comment}
              </p>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 right-0 bg-light-100 pt-1 pl-1 z-10">
          <button
            className="py-4 px-6 mt-auto w-fit bg-dark cursor-pointer"
            onClick={() =>
              (window.location.href =
                "mailto:bentoumi.anesgh@gmail.com?subject=Hello&body=I%20am%20interested%20in%20your%20services.")
            }
          >
            <span className="font-sans font-medium text-md">Let’s Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReachMe;
