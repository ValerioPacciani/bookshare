import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosConfig";
import Bookcard from "../components/Bookcard";
import Navbar from "../components/Navbar";
import { divIcon } from "leaflet";

const UserIcon = divIcon({
  html: ` <div style="background-color: red; border: 2px solid; border-radius:8px ;border-color:black;weight: 10px:height: 10px">
	ciao
</div> `,
  className: "",
  iconSize: [60, 70],
  iconAnchor: [30, 70]


})

const Map = () => {
  const [userPosition, setUserPosition] = useState([]);
  const [nearUsers, setNearUsers] = useState([]);
  const [sharedBooks, setSharedBooks] = useState([]);
  const [ready, setReady] = useState(false);
  const [radius, setRadius] = useState(parseInt(10000));

  async function onMarkerClicked(id) {
    try {
      const resp = await axiosClient.get("/api/books/onShare/" + id); //id dell'utente che ho clickato
      setSharedBooks(resp.data);
      console.log("sharedBooks", sharedBooks);
    } catch (error) {
      console.log("errore nel fetch dei libri dell utente", id);
    }
  }

  async function onRequestLoan(bookId) {
    try {
      const resp = await axiosClient.post("api/loans/" + bookId)
      console.log(resp.data)
      //TODO: questa deve essere possibile da fare solo una volta, se la richiesta è gia presente non dovrebbe essere chiamata
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchUserLocation() {
    try {
      //await new Promise((resolve) => setTimeout(resolve, 3000)); //Test of the delay
      const resp = await axiosClient.get("/api/user/userlocation");
      console.log("heydata: ", resp.data.coordinates);
      setUserPosition(resp.data.coordinates);
    } catch (error) {
      console.log("errore nello scaricamento della posizione");
    } finally {
      setReady(true);
    }
  }

  async function fetchNearUsers() {
    try {
      const resp = await axiosClient.get("api/books/near", {
        params: {
          radius, //radius : radius
        },
      });
      setNearUsers(resp.data);
    } catch (error) {
      console.log("nessun utente trovato");
    }
  }

  useEffect(() => {
    fetchUserLocation();
    fetchNearUsers();
  }, []);

  console.log("utenti;", nearUsers);

  //SE NON HO ANCORA I DATI PRONTI
  if (!ready) {
    return (
      <div>
        <p>scaricamento dati...</p>
      </div>
    );
  } else {
    return (

      <div>
        <Navbar>
        </Navbar>
        <MapContainer
          center={userPosition}
          zoom={20}
          style={{ height: "500px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {nearUsers.map((u) => (
            <Marker
              eventHandlers={{ click: () => onMarkerClicked(u._id) }}
              key={u._id}
              position={[u.location.coordinates[0], u.location.coordinates[1]]}
            ></Marker>
          ))}
          <Marker position={userPosition}
            interactive={false}
            icon={UserIcon}>
            <Popup>
              Your Position
            </Popup>
          </Marker>
        </MapContainer>
        <div className="grid grid-cols-4 gap-2 bg-gray-200">
          <div>
            avatar
          </div>
          <div className="col-span-3 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
            {sharedBooks.map((book) => (
              <Bookcard className="mx-2" key={book._id} id={book._id} onRequestLoan={onRequestLoan} size={"small"} mode={"request"} title={book.title} author={book.author} isbn={book.isbn} coverImage={book?.coverImage}>

              </Bookcard>
            ))}
          </div>

        </div>
      </div>
    );
  }
};

export default Map;
