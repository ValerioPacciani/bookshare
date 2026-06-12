//il compente che renderizza il singolo libro


const Bookcard = ({ title, author, coverImage }) => {
    return (
        <div className="h-80 w-48 bg-amber-300 flex flex-col rounded-md">
            <div className="bg-gray-50 h-4/5">
            </div>
            <div>
                <p>{title}</p>
            </div>
            <div>
                <p>{author}</p>
            </div>
        </div>
    )

}

export default Bookcard