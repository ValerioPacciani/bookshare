import { useState } from "react";
import axiosClient from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context";


const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

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



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //this is the call on the backend, it repsonds whit the _id and the token
            const regResp = await axiosClient.post('api/auth/register', { name, email, password })
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
        <div className="min-h-screen bg-blue-950 flex flex-col justify-center align-center">
            <div className="container bg-gray-300 hover:bg-gray-500 mx-auto border-2 rounded-lg ">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-evenly space-y-4 items-center">
                        <div className="mx-2 w-full">
                            <h2>name</h2>
                            <input value={name} onChange={handleName} type="text"></input>
                        </div>
                        <div className="mx-2 w-full ">
                            <h2>email</h2>
                            <input value={email} onChange={handleEmail} type="text"></input>
                        </div>
                        <div className="mx-2 w-full">
                            <h2>password</h2>
                            <input value={password} onChange={handlePassword} type="password"></input>
                        </div>
                        <button type="submit" className="w-full bg-green-300 hover:bg-green-500 border-2 rounded-lg mb-2 ">register</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register