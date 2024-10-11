import { useEffect } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import axios from "./src/api/axios";

export const formatRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    
    return (
        <div>
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="star" />
            ))}
            {halfStar && <FaStarHalf className="star" />}
        </div>
    );
};

export const calcOriginalPrice = (promoPrice, reductionRate)=>{
    const originalPrice = promoPrice/(1 - reductionRate/100);
    return originalPrice.toFixed(2);
};
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { products: data.products };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { products: [] };
    }
};
export const get = (setProducts, BASE_URL)=>{
   
        const getProducts = async ()=>{
            const {products} = await fetchData(BASE_URL);
            setProducts(products);
        }
        getProducts();
 
}
export const formatCountDown = (dueDate,today)=>{
        const distance = dueDate - today;
        const days = Math.floor(distance/(1000*60*60*24));
        const hours = Math.floor(distance%(1000*60*60*24)/(1000*60*60));
        const minutes = Math.floor(distance%(1000*60*60)/(1000*60));
        const seconds = Math.floor(distance%(1000*60)/1000);
        
        return(
            {days:days, hours:hours, minutes, seconds:seconds}
        )
};
export const handleAdd = async (elem, setCart, userId) => {
    const originalQuantity = elem.quantity
    // bdl UI 9bl responce asidi
    setCart(prevCart => {
        const updatedProducts = prevCart?.products?.map(p => 
            p.id === elem.id ? { ...p, quantity: elem.quantity + 1 } : p
        );
        return {
            ...prevCart,
            products: updatedProducts
        };
    });        
    try {
        const res = await axios.put(`/carts/${userId}`,
            JSON.stringify({
                merge: false,
                products: [
                    {
                        id: elem.id,
                        quantity: elem.quantity + 1,
                    },
                ],
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const updatedQuantity = res?.data?.products[0].quantity;
        if(updatedQuantity){
            setCart((prevCart) => {
                const updatedProducts = prevCart?.products.map((p) =>
                    p.id === elem.id ? { ...p, quantity: updatedQuantity } : p
                );
                return { ...prevCart, products: updatedProducts };
            });
        }else{
            console.error('cant reach the server, please try again !')
        }
    }catch (error) {
        console.error("Error updating cart", error);
        //revert asidi
        setCart((prevCart) => {
            const updatedProducts = prevCart?.products.map((p) =>
                p.id === elem.id ? { ...p, quantity: originalQuantity } : p
            );
            return { ...prevCart, products: updatedProducts };
        });
        alert("Failed to update cart.seem like the server cant be reached Please try again later.");
    }
};
export const handleTake = async (elem, setCart, userId) => {
    const originalQuantity = elem.quantity
    // bdl UI 9bl responce asidi
    setCart(prevCart => {
        const updatedProducts = prevCart?.products?.map(p => 
            p.id === elem.id ? { ...p, quantity: elem.quantity - 1 } : p
        );
        return {
            ...prevCart,
            products: updatedProducts
        };
    });        
    try {
        const res = await axios.put(`/carts/${userId}`,
            JSON.stringify({
                merge: false,
                products: [
                    {
                        id: elem.id,
                        quantity: elem.quantity - 1,
                    },
                ],
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const updatedQuantity = res?.data?.products[0].quantity;
        if(updatedQuantity){
            setCart((prevCart) => {
                const updatedProducts = prevCart?.products.map((p) =>
                    p.id === elem.id ? { ...p, quantity: updatedQuantity } : p
                );
                return { ...prevCart, products: updatedProducts };
            });
        }else{
            console.error('cant reach the server, please try again !')
        }
    }catch (error) {
        console.error("Error updating cart", error);
        //revert asidi
        setCart((prevCart) => {
            const updatedProducts = prevCart?.products.map((p) =>
                p.id === elem.id ? { ...p, quantity: originalQuantity } : p
            );
            return { ...prevCart, products: updatedProducts };
        });
        alert("Failed to update cart.seem like the server cant be reached Please try again later.");
    }
};
export const addToCart = async(product,cart,setCart,userId)=>{
    let exist = false;
    cart?.products.map(p=>{
        (product.id === p.id)?exist = true:p;
    })
    if(exist){
       return;
    }else{
        const updatedProducts = [...cart.products,product];
        setCart(c=>{
            return {...c,products: updatedProducts}
        })
        try{
            const res = await axios.put(`/carts/${userId}`,
                JSON.stringify({
                    merge: false,
                    products: [
                        {
                            id: product.id,
                            quantity: 1,
                        },
                    ],
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const updatedProducts = [...cart.products,res?.data?.products[0]];
            setCart(c=>{
                return {...c,products: updatedProducts}
            })
        }catch(err){
             console.error("Error adding product to cart:", err);
             alert("There was an issue adding the product to your cart. Please try again later.");
        }
    }
}