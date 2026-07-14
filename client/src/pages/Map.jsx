import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosConfig";
import Bookcard from "../components/Bookcard";
import Navbar from "../components/Navbar";
import { divIcon } from "leaflet";
import BottomBar from "../components/BottomBar";

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});






const Map = () => {
  const [userPosition, setUserPosition] = useState([]);
  const [nearUsers, setNearUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [sharedBooks, setSharedBooks] = useState([]);
  const [ready, setReady] = useState(false);
  const [radius, setRadius] = useState(parseInt(10000));
  const [isActive,setIsActive] = useState(false);




  async function onMarkerClicked(id) {
    try {
      const resp = await axiosClient.get("/api/books/onShare/" + id); //id dell'utente che ho clickato
      const aUser = nearUsers.filter((user) => user._id.toString() === id.toString());
      setActiveUser(aUser[0]);
      setSharedBooks(resp.data);
      setIsActive(prev => !prev);
      //console.log("sharedBooks", sharedBooks);
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

      <div className=" relative flex-flex-col h-screen overflow-hidden">
        <Navbar>
        </Navbar>
        <MapContainer
          center={userPosition}
          zoom={16}
          style={{ height: "100% ", }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {nearUsers.map((u) => {
            console.log("utente", u.name)
            console.log("avatar", u.avatar)

            return (<Marker
              eventHandlers={{
                click: () => onMarkerClicked(u._id),
                mouseover: (e) => { e.target.openPopup(); },
                mouseout: (e) => { e.target.closePopup(); }
              }}

              key={u._id}
              position={[u.location.coordinates[0], u.location.coordinates[1]]}>
              <Popup closeButton={false} autoPan={false} className="popup-custom">
                <div className="flex flex-col items-center justify-center">
                  {u.display_name}
                  <div className="flex items-center justify-center border border-black rounded-full h-12 w-12 overflow-hidden">
                    <img src={u?.avatar}>
                    </img>
                  </div>
                </div>
              </Popup>
            </Marker>)
          })}
          <Marker position={userPosition}


            icon={greenIcon}
            eventHandlers={{
              mouseover: (e) => { e.target.openPopup(); },
              mouseout: (e) => { e.target.closePopup(); }
            }}>
            <Popup closeButton={false} autoPan={false} className="popup-custom">
              <div className="flex flex-col items-center justify-center">
                You
              </div>
            </Popup>
          </Marker>
        </MapContainer>
        <BottomBar sharedBooks = {sharedBooks} isActive = {isActive} activeUser= {activeUser}></BottomBar>
      </div>
      
    );
  }
};

export default Map;
