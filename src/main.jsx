import { createRoot } from 'react-dom/client';
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import './index.css';
import HomePage from './pages/homePage/homePage';
import Redirect from '../redirect';
import Shop from './pages/shop/shop';
import { createContext, useEffect, useState } from 'react';

export const cartContext = createContext(null);

const Main = () => {
    const [cart, setCart] = useState([]);

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
        <cartContext.Provider value={{ cart, setCart }}>
            <RouterProvider router={routes} />
        </cartContext.Provider>
    );
}

createRoot(document.getElementById('root')).render(<Main />);