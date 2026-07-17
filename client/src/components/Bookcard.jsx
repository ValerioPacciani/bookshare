const Bookcard = ({ title, author, onRequestLoan, coverImage, isbn, size, mode, id }) => {
  //console.log("Bookcard onrequestLona -> ", onRequestLoan);
  const isSmall = size === "small";
  // Mantengo esattamente le tue classi di grandezza originarie
  const size_classes = isSmall ? "h-48 w-32" : "h-80 w-48";

  return (
    <div
      className={`relative ${size_classes} flex flex-col rounded-xl overflow-hidden border border-gray-600 bg-gray-900 shadow-md group`}
    >
      {/*Image container, we used inset-o, it means top-0,bottom-0,right-0, left-0 so it is the same height and wheight of the container */}
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={coverImage}
        alt={`Copertina di ${title}`}
      />

      {/* Band for rendering the text*/}
      <div className="absolute bottom-0 left-0 right-0 p-1 flex flex-col gap-1 bg-gray-500/40 backdrop-blur-sm border-t border-white/10">

        {/* Text rendering, troncated for the space */}
        <div className="w-full text-center">
          <h4 className={`font-bold tracking-tight text-white truncate ${isSmall ? "text-xs" : "text-sm"}`}>
            {title}
          </h4>
          <p className={`text-gray-300 font-light truncate ${isSmall ? "text-[10px]" : "text-xs"}`}>
            {author}
          </p>
        </div>

        {/* Button for request Loan*/}
        {mode === "request" && (
          <button
            onClick={() => onRequestLoan(id)}
            className={`w-full cursor-pointer flex items-center justify-center font-semibold rounded-md bg-indigo-600 text-white shadow transition-all duration-200 hover:bg-indigo-500 active:scale-[0.95] ${isSmall ? "py-1 text-[10px] mt-0.5" : "py-1.5 text-xs mt-1"
              }`}
          >
            Ask
          </button>
        )}
      </div>
    </div>
  );
};

export default Bookcard