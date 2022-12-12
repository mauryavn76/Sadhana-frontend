import React, { useEffect } from 'react'
// import { useRouter } from 'next/router';
import Router from 'next/router';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

const AdminLayout = ({ children }) => {
    const getToken = () => {
        if (typeof window !== "undefined") {
            let token = localStorage.getItem("access-token");
            return token;
        }
    };

    useEffect(() => {
        if (!getToken()) {
            setTimeout(() => {
                Router.push('/user/login')
            }, 1000)
        }
    }, [])

    // const router = useRouter()

    if (!getToken()) {
        // router.push("/user/login")

        // if (typeof window !== "undefined") {
        // Client-side-only code
        // window.location.href = "http://localhost:3000/user/login"
        return <div style={{ height: "100vh", width: "100vw", display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>
        // }

    }

    return children
}

export default AdminLayout
