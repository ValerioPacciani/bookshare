import { useState } from "react";
import axiosClient from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context";
import { Link } from "react-router-dom";
import { geoJSON } from "leaflet";


const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    //posizione
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const retrievePosition = () => {
         //i need a promise there for stopping the code for getting executed before the data comes form the browser
        return new Promise((resolve, reject) => {
        
           
              
            //retrive geo from browser
        navigator.geolocation.getCurrentPosition(
          
        (position) => {
        const { latitude, longitude } = position.coords;
        //setLat(latitude)
       // setLong(longitude)
        return resolve ({latitude, longitude});
        
        },
        //the function navigator.geolocation.getCurrentPosition has two callbacks, one that return the positon (position) => and one for the errors (error)=>
         (error) => {   
            console.log("errore gestione coordinate")
            reject(error);
        
         });
    })
    }
    

    const handleSubmit = async (e) => {
        let lat = null;
        let long = null;

        e.preventDefault();

        try {
            const GeoStatus = await retrievePosition();
           // console.log(GeoStatus.latitude + "and" + GeoStatus.longitude)
             lat = GeoStatus.latitude;
             long = GeoStatus.longitude;
            

        } catch (GeoE){
            console.log("no coordinates",GeoE)
        }

        try {
            //this is the call on the backend, it repsonds whit the _id and the token
            const regResp = await axiosClient.post('api/auth/register', { name, email, password, long, lat })
            console.log(regResp);
            //logghiamo il nuovo utente, registrandolo con il token
            login(regResp.data, regResp.data.token);
            navigate('/');

        } catch (error) {
            //TODO MOSTRARE ERRORI NELLA PAGINA
            console.error(error.response.data.message)
        }
    }
    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center">
            <div className="container  max-w-md bg-gray-300 text-center rounded-lg p-4 mx-auto border border-black">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-evenly space-y-4">
                        <div>
                            <h1>REGISTER</h1>

                        </div>
                        <div>
                            <p>Name</p>
                            <input value={name} onChange={handleName}  className="w-full border border-white rounded-lg p-3 focus:outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <p>Email</p>
                            <input value={email} onChange={handleEmail} className="w-full border border-white rounded-lg p-3 focus:outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <p>Password</p>
                            <input value={password} onChange={handlePassword} type="password" className="w-full border border-white rounded-lg p-3 focus:outline-none focus:border-blue-400" />
                        </div>
                         
                        <div>
                            <button type="submit" className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-900'>Register</button>
                        </div>
                        <div>
                            <Link to="/login" className='text-blue-500 hover:text-blue-800'>Instead Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default Register