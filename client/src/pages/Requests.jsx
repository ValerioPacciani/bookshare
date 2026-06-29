import { useEffect, useState } from "react";
import axiosClient from "../api/axiosConfig";
import Navbar from "../components/Navbar";

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
      <Navbar></Navbar>
      <div>
        inviate
        {sendRequests.map((sendrequest) =>
          <div className="p-2 m-1 bg-slate-200 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center" key={sendrequest._id}>

            <div >
              <p>da {sendrequest.senderId.name} </p>
            </div>
            <div>
              <p>per {sendrequest.ownerId.name}</p>
            </div>

            <div><p>chiede {sendrequest.bookId.title}</p></div>
            <div className="flex flex-row gap-6">
              <button className="bg-red-400 border border-red-900 rounded-md p-1">Delete</button>
            </div>
          </div>)}

      </div>
      <div>
        In Arrivo
        {incomingRequests.map((increquest) =>
          <div className="p-2 m-1 bg-slate-200 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center" key={increquest._id}>

            <div >
              <p>da {increquest.senderId.name} </p>
            </div>
            <div>
              <p>per {increquest.ownerId.name}</p>
            </div>

            <div><p>chiede {increquest.bookId.title}</p></div>
            <div className="flex flex-row gap-6">
              <button className="bg-green-400 border border-green-900 rounded-md p-1">
                accept
              </button>
              <button className="bg-red-400 border border-red-900 rounded-md p-1">refuse</button>
            </div>
          </div>)}
      </div>
    </div>



  );
};

export default Requests;
