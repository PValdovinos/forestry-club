import { createContext, useContext, useState, useEffect } from "react"
import { BASE_URL } from "./projectVariables"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/userStatus.php`, {
                    credentials: "include",
                })
                const data = await response.json()
                if (data.success) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (err) {
                console.error("Session check failed", err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkSession()
    }, [])

    const login = (userData) => {
        setUser(userData)
    }

    const logout = async () => {
        await fetch(`${BASE_URL}/api/auth.php`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "logout" })
        })
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}