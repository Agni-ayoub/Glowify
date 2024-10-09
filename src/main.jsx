import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import './index.css';
import HomePage from './pages/homePage/homePage';
import Shop from './pages/shop/shop';
import { createContext, useState } from 'react';
export const globalContext = createContext({});

const Main = () => {
    const [cart, setCart] = useState({});    

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
        }
    ]);

    return (
        <globalContext.Provider value={{cart,setCart}}>
            <RouterProvider router={routes} />
        </globalContext.Provider>
    );
}

createRoot(document.getElementById('root')).render(<Main />);