import { useEffect, useState } from "react";
import axiosClient from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { Trash2, Check, PackageCheck, ChevronDown } from "lucide-react";

const Requests = () => {
  //gestione frontend
  const [sendDropdownStatus,updateSendDropdownStatus] = useState(false);
  const[sendDropArrow,rotateSendDropArrow] = useState(false)
  
  const handleSendDropdown = () => {
    updateSendDropdownStatus((prev) => !prev);
    rotateSendDropArrow((prev) => !prev);
    //console.log(sendDropdownStatus)
  }
  
  //gestione dati
  const [sendRequests, setSendRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [buttonclicked, setButtonClicked] = useState(false);

  

  const incomingAccepted = incomingRequests.filter(
    (loan) => loan.status === "accepted",
  );
  const incomingRefused = incomingRequests.filter(
    (loan) => loan.status === "refused",
  );
  const incomingPending = incomingRequests.filter(
    (loan) => loan.status === "pending",
  );

  const sendPending = sendRequests.filter((loan) => loan.status === "pending");
  const sendRefused = sendRequests.filter((loan) => loan.status === "refused");
  const sendAccepted = sendRequests.filter(
    (loan) => (loan.status === "accepted" || loan.status === "returned")//todo aggiungere returned
  );


  async function confirmLoan(requestId) {
    try {
      const resp = await axiosClient.put("/api/loans/confirm/" + requestId);
      setButtonClicked((prev) => !prev);
      } catch (e) {
        console.log(e.error)
      }
  }

  async function updateLoanRequest(requestId, statusTo) {
    try {
      const resp = await axiosClient.put("/api/loans/update/" + requestId, {
        status: statusTo,
      });
      setButtonClicked((prev) => !prev);
    } catch (e) {
      console.log("errore nell aggiornamento della richiesta");
    }
  }



  async function fetchreq() {
    const resps = await axiosClient.get("/api/loans/");
    const respi = await axiosClient.get("/api/loans/recevied");

    setSendRequests(resps.data);
    setIncomingRequests(respi.data);
  }

  useEffect(() => {
    fetchreq();
  }, [buttonclicked]);

  console.log("richieste mandate: ", sendRequests);
  console.log("richieste in arrivo: ", incomingRequests);

  return (
    <div>
      <Navbar></Navbar>
      <div className="border border-slate-500 rounded-md bg-slate-300 p-3 m-1">
        <div>
          {" "}
          <h1>Inviate</h1>
          <button onClick={handleSendDropdown}>
          <ChevronDown className={` transition-transform duration-500 ease-in-out
        ${sendDropArrow ? 'rotate-180' : 'rotate-0'}`}></ChevronDown>
          </button>
        </div>
       
           <div className={`overflow-hidden transition-all duration-500 ease-in-out ${ 
              sendDropdownStatus ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
        <div>
          {sendPending.map((sendrequest) => (
            <div
              className="p-2 m-1 bg-slate-200 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center"
              key={sendrequest._id}
            >
              <div>
                <p>To {sendrequest.ownerId.name} </p>
              </div>

              <div className="">
                <p> You asked "{sendrequest.bookId.title}"</p>
              </div>

              <div>
                <p>waiting...</p>
              </div>

              <div className="flex flex-row gap-6">
                <button
                  onClick={() => updateLoanRequest(sendrequest._id, "refused")}
                  className="flex items-center pr-3 bg-red-400 border border-red-900 rounded-md p-1 text-sm font-light text-red-800"
                >
                  {" "}
                  <Trash2></Trash2>Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          Annullate/cancellate
          {sendRefused.map((sendrefrequest) => (
            <div
              className="p-2 m-1 bg-red-300 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center"
              key={sendrefrequest._id}
            >
              <div>
                <p>To {sendrefrequest.ownerId.name} </p>
              </div>

              <div>
                <p>You Asked :"{sendrefrequest.bookId.title}"</p>
              </div>
              <div>
                <p>
                  Deleted:{" "}
                  {new Date(sendrefrequest.updatedAt).toLocaleDateString(
                    "it-IT",
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          Accettate
          {sendAccepted.map((sendaccrequest) => (
            <div
              className="p-2 m-1 bg-green-300 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center"
              key={sendaccrequest._id}
            >
              <div>
                <p>To {sendaccrequest.ownerId.name} </p>
              </div>

              <div>
                <p>The book :"{sendaccrequest.bookId.title}"</p>
              </div>
              <div>
                <p>
                  Accepted:{" "}
                  {new Date(sendaccrequest.updatedAt).toLocaleDateString(
                    "it-IT",
                  )}
                </p>
              </div>
              <div>
              {sendaccrequest.status === "returned" ? (
                <p> this request was already completed</p>
              ): (<button
                onClick={() => confirmLoan(sendaccrequest._id)}
                className="flex items-center  gap-1 bg-blue-400 border border-blue-900 rounded-md p-1 text-sm font-light text-blue-800"
              >
                <PackageCheck></PackageCheck>
                Confirm
              </button>
            )}
            </div>
            </div>
          ))}
        </div>
      </div>
     
        
      <div>



        In Arrivo
        {incomingPending.map((increquest) => (
          <div
            className="p-2 m-1 bg-slate-200 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center"
            key={increquest._id}
          >
            <div>
              <p>From {increquest.senderId.name} </p>
            </div>

            <div className="col-span-2">
              <p>Asking : "{increquest.bookId?.title}"</p>
            </div>
            <div className="flex flex-row gap-6">
              <button
                onClick={() => updateLoanRequest(increquest._id, "accepted")}
                className="flex items-center pr-3 bg-green-400 border border-green-900 rounded-md p-1 text-sm text-green-800 font-light"
              >
                <Check></Check>
                Accept
              </button>
              <button
                onClick={() => updateLoanRequest(increquest._id, "refused")}
                className="flex items-center pr-3 bg-red-400 border border-red-900 rounded-md p-1 text-sm font-light text-red-800"
              >
                {" "}
                <Trash2></Trash2>Refuse
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        Rifiutate
        {incomingRefused.map((refrequest) => (
          <div
            className="p-2 m-1 bg-red-300 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center"
            key={refrequest._id}
          >
            <div>
              <p>From {refrequest.senderId.name} </p>
            </div>

            <div>
              <p>The book :"{refrequest.bookId.title}"</p>
            </div>
            <div>
              <p>
                Deleted :
                {new Date(refrequest.updatedAt).toLocaleDateString("it-IT")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        Accettate
        {incomingAccepted.map((accrequest) => (
          <div
            className="p-2 m-1 bg-green-300 border rounded-2xl border-slate-900 grid grid-cols-4 justify-around items-center"
            key={accrequest._id}
          >
            <div>
              <p>To {accrequest.senderId.name} </p>
            </div>

            <div>
              <p>The Book:"{accrequest.bookId.title}"</p>
            </div>
            <div>
              <p>
                Accepted:{" "}
                {new Date(accrequest.updatedAt).toLocaleDateString("it-IT")}
              </p>
            </div>
            <div>
              {accrequest.status === "returned" ? (
                <p> this request was already completed</p>
              ): (<button
                onClick={() => confirmLoan(accrequest._id)}
                className="flex items-center  gap-1 bg-blue-400 border border-blue-900 rounded-md p-1 text-sm font-light text-blue-800"
              >
                <PackageCheck></PackageCheck>
                Confirm
              </button>
            )}
              </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Requests;
