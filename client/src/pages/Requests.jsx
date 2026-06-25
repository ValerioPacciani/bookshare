import { useEffect, useState } from "react";
import axiosClient from "../api/axiosConfig";

const Requests = () => {
  const [sendRequests, setSendRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  async function fetchreq() {
    const resps = await axiosClient.get("/api/loans/");
    const respi = await axiosClient.get("/api/loans/recevied");

    setSendRequests(resps.data);
    setIncomingRequests(respi.data);
  }
  useEffect(() => {
    fetchreq();
  }, []);

  console.log("richieste mandate: ", sendRequests);
  console.log("richieste in arrivo: ", incomingRequests);

  return (
    <div>
      inviate
      {sendRequests.map((sendrequest) =>
        <div className="flex flex-row justify-between items-center" key={sendrequest._id}>

          <div>
            <p>da {sendrequest.ownerId.name} </p>
          </div>
          <div>
            <p>per {sendrequest.senderId.name}</p>
          </div>

          <div><p>chiede {sendrequest.bookId.title}</p></div>
        </div>)}

    </div>
  );
};

export default Requests;
