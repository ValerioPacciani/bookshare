//component for display data, whit the design of the site

const bgColors = {
  green: "bg-emerald-400",
  red: "bg-red-400",
  blue: "bg-blue-400",
  amber: "bg-amber-400",
};

//for transiction effect i have to write that:
const numberColors = {
  green: " from-emerald-400 to-emerald-700",
  red: " from-red-400 to-red-700",
  blue: "from-cyan-300 to-blue-700",
  amber: "from-amber-400 to-amber-700",
};

const GenericDataCard = ({ data, number, color, icon }) => {
  const bgColor = bgColors[color];
  const numberColor = numberColors[color];
  return (
    <div className=" bg-slate-200 group p-3 max-w-xl w-68 h-32 max-h-64 min-w-6 min-h-6 border border-slate-600 rounded-2xl flex flex-col gap-2 justify-center items-center ">
      <div className="flex flex-row items-center justify-around  ">
        <div className="text-lg font-semibold tracking-wide whitespace-nowrap uppercase text-slate-800">
          <p>{data}</p>
        </div>
        <div
          className={`  rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
        >
          {icon}
        </div>
      </div>
      <div
        className={` bg-linear-to-r ${numberColor} bg-clip-text text-transparent text-4xl font-extrabold tracking-tight     `}
      >
        <h1>{number}</h1>
      </div>
    </div>
  );
};

export default GenericDataCard;
