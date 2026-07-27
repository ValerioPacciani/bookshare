import { useParams } from "react-router-dom"


const User = () => {

    const { id } = useParams();
 

    return(
        <div>to Impement, userid = {id}</div>
    )
}


export default User