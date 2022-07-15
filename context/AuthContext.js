import {createContext, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {NEXT_URL} from '../config/index'
import {toast} from "react-toastify";
import axios from "axios";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => checkUserLoggedIn, [])

    // Login user
    const login = async ({
                             identifier,
                             password
                         }) => {
        axios.post(`${NEXT_URL}/login`,
            {
                identifier,
                password
            }).then(response => {
            // console.log(response)
            // console.log("User Profile", response.data.user)
            // console.log("JWT", response.data.jwt)
            toast.success('ورود موفق')
            setUser(response.data.user)
            // console.log(cookies.token)
            // setUser(response.data.user)
            router.push('/ExpenseTracker')
        }).catch(error => {
            console.log(error)
            toast.error('ورود ناموفق')
            // console.log(error)
        })
    }

    // Logout user
    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/logout`, {
            method: 'POST',
        })

        if (res.ok) {
            setUser(null)
            await router.push('/')
        }
    }

    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/user`)
        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                // register,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
