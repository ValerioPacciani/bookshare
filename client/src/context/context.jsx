import React, { createContext, useState, useContext } from "react"; //imports

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //prendi il token dall localstorage del browser, cosi sell'utente è stato loggato precedentemnte, ed ha il suo token nel local storage, prendi quello
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const login = (userData, tokenData) => {
        setUser(userData)
        setToken(tokenData)
        //se si logga salva nell'localstorage del browser
        localStorage.setItem('token', tokenData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }


    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
export const useAuth = () => useContext(AuthContext)

