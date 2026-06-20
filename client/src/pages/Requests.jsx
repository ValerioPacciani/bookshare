import { useEffect, useState } from "react"
import axiosClient from "../api/axiosConfig";


const Requests = () => {

    const [requests, setRequests] = useState();
    async function fetch() {
        const resp = await axiosClient.get("/api/loans/");
        console.log("array delle richieste:", resp.data)
        setRequests(resp.data);

    }
    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>copertina</th>
                        <th>Da</th>
                        <th>titolo</th>
                    </tr>
                    {requests.map((request) => ( //key is the way react tell the component exist, so it is relly important
                        <tr key={request._id}>
                            <td>
                                <p> Da {request.senderId.name} </p>
                            </td>


                        </tr> //key is the way react tell the component exist, so it is relly important
                    )
                    )}
                </thead>

            </table>
        </div>
    )
}


export default Requests