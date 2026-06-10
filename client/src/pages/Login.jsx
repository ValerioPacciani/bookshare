import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axiosClient from '../api/axiosConfig'
import { useAuth } from '../context/context'

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        //non aggiornare la pagina (react)
        e.preventDefault();
        try {
            const postRes = await axiosClient.post('/api/auth/login', { email, password });
            //that is the context login
            login(postRes.data, postRes.data.token);
            console.log("dati coretti, indirizzamento ad home");
            navigate('/');

        } catch (error) {
            console.error(error.response.data.message);
        }
    }



    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center">
            <div className="container  max-w-md bg-gray-300 text-center rounded-lg p-4 mx-auto border border-black">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-evenly space-y-4">
                        <div>
                            <h1>LOGIN</h1>

                        </div>
                        <div>
                            <p>Email</p>
                            <input value={email} onChange={handleChangeEmail} className="w-full border border-white rounded-lg p-3 focus:outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <p>Password</p>
                            <input value={password} onChange={handleChangePassword} type="password" className="w-full border border-white rounded-lg p-3 focus:outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <button type="submit" className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-900'>Sign in</button>
                        </div>
                        <div>
                            <Link to="/register" className='text-blue-500 hover:text-blue-800'>Instead register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login