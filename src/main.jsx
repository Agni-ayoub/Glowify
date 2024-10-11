import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import './index.css';
import HomePage from './pages/homePage/homePage';
import Shop from './pages/shop/shop';
import { createContext, useEffect, useState, useRef } from 'react';
import Login from './pages/accout/login/login';
import axios from './api/axios';
export const globalContext = createContext(null);

const Main = () => {
    const [cart, setCart] = useState([]);
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = auth? auth?.id: undefined;
    const flashSectionRef = useRef(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const authenticateUser = async () => {
            setLoading(true);
            try {

                if (!token) throw new Error("No token found");
    
                
                const res = await axios.get('/auth/me', 
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }
                );
                
                if (res?.data?.id) {
                    setAuth(res.data);
                } else {
                    throw new Error('Authentication failed');
                }
            } catch (err) {
                
                const reToken = localStorage.getItem('refresh');
                if (reToken) {
                    try {
                        const res = await axios.post('/auth/refresh',
                            JSON.stringify({ refreshToken: reToken }),
                            { headers: { "Content-Type": 'application/json' } }
                        );
                        
                       
                        localStorage.setItem('token', res?.data?.accessToken);
                        localStorage.setItem('refresh', res?.data?.refreshToken);
    
                        // Retry the failed request with new token :)
                        const resRetry = await axios.get('/auth/me', 
                            { headers: { 'Authorization': `Bearer ${res?.data?.accessToken}` } }
                        );
                        setAuth(resRetry.data);
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh');
                    }
                } else {
                    console.error('No refresh token found or refresh failed:', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                }
            } finally {
                setLoading(false);
            }
        };
    
        authenticateUser();
    }, []);
    useEffect(()=>{
        if(userId){
            (
                async()=>{
                    try{
                        const res = await fetch(`https://dummyjson.com/carts/${userId}`)
                        .then(res => res.json())
                        setCart(res);
                    }catch(err){
                        console.error(err);
                    }
                }
            )();
        }
    },[userId]);
    if (loading) {
        return (
        <div className="fullLoading">
            <div className="loading">
                Loading<span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
        
        );
    }
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/homePage",
            element: <HomePage />
        },
        {
            path: "/shop/:category",
            element: <Shop />
        },
        {
            path: "/login",
            element: <Login />
        }
    ]);
    return (
        <globalContext.Provider value={{cart,setCart, setAuth,auth,setLoading,userId,flashSectionRef}}>
            <RouterProvider router={routes} />
        </globalContext.Provider>
    );
}

createRoot(document.getElementById('root')).render(<Main />);