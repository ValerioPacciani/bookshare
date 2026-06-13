//il compente che renderizza il singolo libro


const Bookcard = ({ title, author, coverImage }) => {
    console.log(coverImage)
    return (
        <div className=" mt-1.5 ml-2 h-80 w-48 flex flex-col rounded-md border-2 border-gray-400 bg-gray-700">
            <div className="h-4/5 overflow-visible">
                <img className = "" src={coverImage}></img>
            </div>
            <div className="flex flex-row items-center justify-center  bg-gray-200/50 ">
                <p className="font-semibold  truncate w-full ">{title}</p>
            </div>
            <div className="flex flex-row items-center justify-center bg-gray-200/50"> 
                <p className="font-light  truncate w-full ">{author}</p>
            </div>
        </div>
    )

}

export default Bookcard