//il compente che renderizza il singolo libro

const Bookcard = ({ title, author, onRequestLoan, coverImage, isbn, size, mode }) => {
  //console.log(coverImage)
  //we need to resize for the map component
  const size_classes = size === "small" ? "h-48 w-32" : "h-80 w-48";
  return (
    <div
      className={` mt-1.5 ml-2 ${size_classes} flex flex-col rounded-md border-2 border-gray-400 bg-gray-700`}
    >
      <div className="h-4/5 overflow-hidden">
        <img className="" src={coverImage}></img>
      </div>
      <div className="flex flex-row items-center justify-center  bg-gray-200/20 ">
        <p className="font-semibold  truncate w-full ">{title}</p>
      </div>
      <div className="flex flex-row items-center justify-center bg-gray-200/20">
        <p className="font-light  truncate w-full ">{author}</p>
      </div>
      {mode === "request" && (
        <button onClick = {onRequestLoan} className="inline-block cursor-pointer items-center justify-center rounded-xl border-[1.58px] border-zinc-600 bg-zinc-950 px-5 py-3 font-medium text-slate-200 shadow-md transition-all duration-300 hover:[transform:translateY(-.335rem)] hover:shadow-xl">
          Ask
        </button>
      )}
    </div>
  );
};

export default Bookcard;
