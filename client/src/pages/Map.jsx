import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosConfig";

const Map = () => {
  const [userPosition, setUserPosition] = useState([]);
  const [nearUsers, setNearUsers] = useState([]);
  const [ready, setReady] = useState(false);
  const [radius, setRadius] = useState(parseInt(10000));

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
        <MapContainer
          center={userPosition}
          zoom={13}
          style={{ height: "500px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {nearUsers.map((u) => (
            <Marker
              key={u._id}
              position={[u.location.coordinates[0], u.location.coordinates[1]]}
            ></Marker>
          ))}
          <Marker position={userPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
};

export default Map;
